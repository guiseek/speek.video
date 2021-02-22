import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Component, Inject, OnInit } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

const MAX_SIZE = 65535
const END_OF_FILE = 'EOF'

@Component({
  selector: 'speek-transfer',
  templateUrl: './transfer.dialog.html',
  styleUrls: ['./transfer.dialog.scss'],
})
export class TransferDialog implements OnInit {
  message = ''
  private _progress = new BehaviorSubject(0)
  progress$ = this._progress.asObservable()

  constructor(
    readonly ref: MatDialogRef<TransferDialog>,
    @Inject(MAT_DIALOG_DATA)
    readonly connection: RTCPeerConnection
  ) {}

  ngOnInit(): void {
    this.connection.addEventListener('datachannel', ({ channel }) => {
      console.log(channel)

      channel.binaryType = 'arraybuffer'
      const buffers: ArrayBuffer[] = []
      channel.onmessage = async ({ data }) => {
        try {
          if (data !== END_OF_FILE) {
            buffers.push(data)
          } else {
            const arrayBuffer = buffers.reduce((acc, arrayBuffer) => {
              const tmp = new Uint8Array(
                acc.byteLength + arrayBuffer.byteLength
              )
              tmp.set(new Uint8Array(acc), 0)
              tmp.set(new Uint8Array(arrayBuffer), acc.byteLength)
              return tmp
            }, new Uint8Array())
            const blob = new Blob([arrayBuffer])
            this.downloadFile(blob, channel.label)
            this.message = 'Transferência concluída'
            setTimeout(() => this.ref.close(), 2000)
            channel.close()
          }
        } catch (err) {
          console.log('File transfer failed')
          this.message = 'Erro na transferência :/'
        }
      }
    })
  }

  shareFile(files: FileList) {
    if (!!files.length) {
      let file: File = files[0]
      const channelLabel = file.name
      const channel = this.connection.createDataChannel(channelLabel)
      channel.binaryType = 'arraybuffer'
      channel.addEventListener('open', async (ev) => {
        const arrayBuffer = await file.arrayBuffer()
        let i = 0
        for (i; i < arrayBuffer.byteLength; i += MAX_SIZE) {
          channel.send(arrayBuffer.slice(i, i + MAX_SIZE))
        }
        channel.send(END_OF_FILE)
        this.message = 'Transferência concluída'
        setTimeout(() => this.ref.close(), 2000)
      })
    }
  }

  downloadFile(blob: Blob, name: string) {
    const a = document.createElement('a')
    const url = window.URL.createObjectURL(blob)
    a.download = name
    a.href = url
    a.click()
    window.URL.revokeObjectURL(url)
    a.remove()
  }
  onClose() {}
}
