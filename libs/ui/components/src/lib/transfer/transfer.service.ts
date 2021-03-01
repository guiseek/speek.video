import {
  ConfirmDialog,
  DialogConfirmData,
} from './../alert/confirm/confirm.dialog'
import { MatDialog } from '@angular/material/dialog'
import { Injectable } from '@angular/core'
import { TransferDialog } from './transfer.dialog'
import { Observable, Subject } from 'rxjs'
import { WithTarget } from '@speek/core/entity'
import { typeOfFile } from '@speek/util/format'

@Injectable({
  providedIn: 'root',
})
export class TransferService {
  private static MAX_SIZE = 65535
  private static END_OF_FILE = 'EOF'

  private _file = new Subject<File>()
  file$ = this._file.asObservable()

  constructor(private _dialog: MatDialog) {}

  open(data: RTCPeerConnection) {
    return this._dialog.open(TransferDialog, { data }).afterClosed()
  }

  listenChannel(connection: RTCPeerConnection) {
    connection.addEventListener('datachannel', ({ channel }) => {
      channel.binaryType = 'arraybuffer'
      const receiveBuffers: ArrayBuffer[] = []
      channel.onmessage = async ({ data }) => {
        try {
          if (data !== TransferService.END_OF_FILE) {
            receiveBuffers.push(data)
          } else {
            const arrayBuffer = receiveBuffers.reduce((acc, arrayBuffer) => {
              const tmp = new Uint8Array(
                acc.byteLength + arrayBuffer.byteLength
              )
              tmp.set(new Uint8Array(acc), 0)
              tmp.set(new Uint8Array(arrayBuffer), acc.byteLength)
              return tmp
            }, new Uint8Array())
            const blob = new Blob([arrayBuffer])
            this.downloadFile(blob, channel.label)
            channel.close()
          }
        } catch (err) {
          console.log('File transfer failed')
        }
      }

      return connection
    })
  }

  sendFile(connection: RTCPeerConnection, file: File) {
    const channel = connection.createDataChannel(file.name)
    channel.binaryType = 'arraybuffer'
    channel.addEventListener('open', async (ev) => {
      const arrayBuffer = await file.arrayBuffer()
      let i = 0
      for (i; i < arrayBuffer.byteLength; i += TransferService.MAX_SIZE) {
        channel.send(arrayBuffer.slice(i, i + TransferService.MAX_SIZE))
      }
      channel.send(TransferService.END_OF_FILE)
    })
  }

  openConfirm(file: File) {
    const size = (file.size / 1024).toFixed(0)
    const data: DialogConfirmData = {
      header: 'Transferência de arquivo',
      body: `Aceita receber o arquivo ${file.name}, com ${size}kb ?`,
    }
    return this._dialog
      .open<ConfirmDialog, DialogConfirmData, boolean>(ConfirmDialog, { data })
      .afterClosed()
  }

  public selectFile() {
    const input = document.createElement('input')
    return new Observable((subscriber) => {
      input.type = 'file'
      input.click()
      input.addEventListener('change', ({ target }) => {
        const input = target as HTMLInputElement
        const file = input.files?.item(0)
        typeOfFile(file as File).then((res) => {
          console.log(res)
        })
        subscriber.next(target)
      })
    })
  }

  private downloadFile(blob: Blob, name: string) {
    const a = document.createElement('a')
    const url = window.URL.createObjectURL(blob)
    a.download = name
    a.href = url
    a.click()
    window.URL.revokeObjectURL(url)
    a.remove()
  }
}
