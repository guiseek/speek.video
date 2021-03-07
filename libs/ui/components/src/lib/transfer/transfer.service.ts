import { AlertService } from './../alert/alert.service'
// import {
//   ConfirmDialog,
//   DialogConfirmData,
// } from './../alert/confirm/confirm.dialog'
import { MatDialog } from '@angular/material/dialog'
import { Injectable } from '@angular/core'
import { TransferDialog } from './transfer.dialog'
import { Observable, Subject } from 'rxjs'
import { WithTarget } from '@speek/core/entity'
import { typeOfFile } from '@speek/util/format'
import { filter, map, switchMap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class TransferService {
  private static MAX_SIZE = 65535
  private static END_OF_FILE = 'EOF'

  private _file = new Subject<File>()
  file$ = this._file.asObservable()

  constructor(private _dialog: MatDialog, private _alert: AlertService) {}

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

  send(channel: RTCDataChannel, file: File) {
    channel.onopen = () => {
      const data = JSON.stringify({
        name: file.name,
        type: file.type,
        size: file.size,
      })
      channel.send(data)
    }
    channel.onmessage = ({ data }) => {
      console.log('message: ', data)
      if (data === 'true') {
        ;(async () => {
          channel.binaryType = 'arraybuffer'
          const arrayBuffer = await file.arrayBuffer()
          let i = 0
          for (i; i < arrayBuffer.byteLength; i += TransferService.MAX_SIZE) {
            channel.send(arrayBuffer.slice(i, i + TransferService.MAX_SIZE))
          }
          channel.send(TransferService.END_OF_FILE)
        })()

        // channel.addEventListener('open', async (ev) => {
        // const arrayBuffer = await file.arrayBuffer()
        // let i = 0
        // for (i; i < arrayBuffer.byteLength; i += TransferService.MAX_SIZE) {
        //   channel.send(arrayBuffer.slice(i, i + TransferService.MAX_SIZE))
        // }
        // channel.send(TransferService.END_OF_FILE)
        // })
      }
    }
  }

  listen(channel: RTCDataChannel) {
    return new Observable((subscriber) => {
      channel.addEventListener('message', ({ data }) => {
        const { name, size, type } = JSON.parse(data)
        if (name && size && type) {
          this.openConfirm({ name, size, type })
            .afterClosed()
            .subscribe((confirm) => subscriber.next(confirm))
        }
      })
      channel.addEventListener('message', ({ data }) => {
        channel.binaryType = 'arraybuffer'
        const receiveBuffers: ArrayBuffer[] = []

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
      })
    })
  }

  openConfirm({ name, size, type }: Pick<File, 'name' | 'size' | 'type'>) {
    const total = (size / 1024).toFixed(0)
    const dialog = this._alert.openConfirm({
      header: 'Receber transferência?',
      body: `
        Arquivo: ${name}
        Formato: ${type}
        Tamanho: ${total}kb`,
    })
    console.log(dialog.getState())
    return dialog
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
