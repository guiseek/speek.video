import {
  MessageBody,
  ConnectedSocket,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayDisconnect,
  OnGatewayConnection,
} from '@nestjs/websockets'
import { SpeekAction, SpeekPayload } from '@speek/core/entity'
import { Server, Socket } from 'socket.io'
import { UseGuards } from '@nestjs/common'
import { SignalingGuard } from './signaling.guard'
import { AppLogger } from '../app.logger'

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SignalingGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server

  users = new Map<string, string>()

  constructor(readonly logger: AppLogger) {
    logger.setContext('Signaling')
  }

  @UseGuards(SignalingGuard)
  @SubscribeMessage(SpeekAction.KnockKnock)
  knockKnock(
    @ConnectedSocket() contact: Socket,
    @MessageBody() payload: SpeekPayload
  ) {
    const room = this._room(payload)
    if (room.length >= 0 && room.length < 2) {
      contact.emit(SpeekAction.Available, true)
    } else {
      contact.emit(SpeekAction.Available, false)
    }
  }

  @UseGuards(SignalingGuard)
  @SubscribeMessage(SpeekAction.CreateOrJoin)
  create(
    @ConnectedSocket() contact: Socket,
    @MessageBody() payload: SpeekPayload
  ) {
    if (!this.users.has(contact.id)) {
      this.users.set(contact.id, payload.sender)
    }
    const room = this._room(payload)
    if (room.length === 0) {
      contact.join(payload.code)
      contact.emit(SpeekAction.Created)
    } else if (room.length > 0 && room.length < 5) {
      contact.join(payload.code)
      contact.emit(SpeekAction.Joined, payload.sender)
    } else {
      contact.emit(SpeekAction.Full)
    }
  }

  @UseGuards(SignalingGuard)
  @SubscribeMessage(SpeekAction.Offer)
  restart(
    @ConnectedSocket() contact: Socket,
    @MessageBody() payload: SpeekPayload
  ) {
    const room = contact.to(payload.code)
    room.emit(SpeekAction.Offer, payload)
  }

  @UseGuards(SignalingGuard)
  @SubscribeMessage(SpeekAction.Screen)
  screenShare(
    @ConnectedSocket() contact: Socket,
    @MessageBody() payload: SpeekPayload
  ) {
    const room = contact.to(payload.code)
    room.emit(SpeekAction.Screen, payload)
  }

  private _room({ code }) {
    const adapter = this.server.sockets.adapter
    return adapter.rooms[code] ?? { length: 0 }
  }

  handleConnection(@ConnectedSocket() contact: Socket) {
    this.users.set(contact.id, null)
  }

  handleDisconnect(contact: Socket) {
    contact.broadcast.emit(SpeekAction.Exited, contact.id)
    this.users.delete(contact.id)
    contact.rooms.forEach((room) => contact.leave(room))
    // contact.leaveAll()
  }
}
