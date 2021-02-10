import { SpeekAction, SpeekData, SpeekPayload } from '@speek/core/entity'
import { PeerAdapter, SignalingAdapter } from '../../adapters'
import { ActivatedRoute, Router } from '@angular/router'
import { UUID } from './../../utils/uuid'
import { Subject } from 'rxjs'
import {
  OnInit,
  OnDestroy,
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core'
import { isDefined, notNull } from '../../utils/util/validations'

@Component({
  selector: 'speek-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('local')
  localRef: ElementRef<HTMLVideoElement>
  local: HTMLVideoElement
  localStream: MediaStream

  @ViewChild('remote')
  remoteRef: ElementRef<HTMLVideoElement>
  remote: HTMLVideoElement
  remoteStream: MediaStream

  sender = UUID.short()
  room: string

  private state = new Subject<RTCSignalingState>()
  onState = this.state.asObservable()

  private track = new Subject<MediaStream>()
  onTrack = this.track.asObservable()

  constructor(
    private router: Router,
    readonly peer: PeerAdapter,
    private route: ActivatedRoute,
    readonly signaling: SignalingAdapter
  ) {
    const { room } = this.route.snapshot.params
    if (room === 'newcode') {
      this.router.navigate([UUID.long()])
    }
    this.room = room
  }

  ngOnInit(): void {
    this.signaling.on(SpeekAction.Offer).subscribe((payload) => {
      console.log('payload: ', payload)
      this.handle(payload)
    })

    const payload = new SpeekPayload(this.sender, this.room)
    this.signaling.send(SpeekAction.CreateOrJoin, payload)

    this.peer.onChange.subscribe((state) => {
      this.state.next(state.signalingState)
    })

    this.peer.onCandidate.subscribe((candidate) => {
      if (candidate) {
        this.sendOffer({ ice: candidate })
      }
    })

    this.peer.onTrack.subscribe((track) => {
      this.track.next(track)
      console.log('TRACK: ', track)

      if (track) {
        this.remote.srcObject = track
        track.onremovetrack = (ev) => {
          this.remote.srcObject = null
        }
      }
    })
  }

  ngAfterViewInit(): void {
    this.local = this.localRef.nativeElement
    this.remote = this.remoteRef.nativeElement
    this.signaling.on(SpeekAction.Created).subscribe((payload) => {
      console.log('PAYLOAD: ', payload)
      this.setLocal()
    })
    this.signaling.on(SpeekAction.Joined).subscribe((payload) => {
      console.log('PAYLOAD: ', payload)
      this.setLocal()
    })
  }

  async handle({ data, sender }: SpeekPayload) {
    try {
      console.log(sender !== this.sender, sender, this.sender)

      if (sender !== this.sender) {
        const { sdp, ice } = data
        if (notNull(this.peer.connection) && isDefined(ice)) {
          this.peer.connection.addIceCandidate(new RTCIceCandidate(ice))
        }
        if (sdp) {
          this.makeChoice(sdp)
        }
      }
    } catch (error) {
      throw new Error('handle-message: ' + error)
    }
  }

  async makeChoice(sdp: RTCSessionDescription) {
    switch (sdp.type) {
      case SpeekAction.Offer:
        return this.peer.createAnswer(sdp).then((answer) => {
          this.sendOffer({ sdp: answer })
        })
      case SpeekAction.Answer:
        return this.peer.setRemote(sdp)
    }
  }

  setLocal() {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        this.local.muted = true
        this.localStream = stream
        this.local.srcObject = stream
        stream.getTracks().forEach((track) => {
          this.peer.connection.addTrack(track, stream)
        })
        this.peer.createOffer().then((sdp) => this.sendOffer({ sdp }))
      })
  }

  sendOffer(data: SpeekData) {
    this.signaling.send(
      SpeekAction.Offer,
      new SpeekPayload(this.sender, this.room, data)
    )
  }

  ngOnDestroy(): void {
    if (this.peer.connection) {
      this.peer.connection.close()
    }
  }
}
