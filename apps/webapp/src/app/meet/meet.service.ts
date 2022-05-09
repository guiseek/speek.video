import { Subject } from 'rxjs'
import { Injectable } from '@angular/core'
import { isFirefox } from '@speek/util/device'

@Injectable({
  providedIn: 'root',
})
export class MeetService {
  private static MAX_SIZE = 65535
  private static END_OF_FILE = 'EOF'

  sendFile(connection: RTCPeerConnection, file: File) {
    const channel = connection.createDataChannel(file.name, {
      ordered: true,
      maxPacketLifeTime: 3600,
    })
    channel.addEventListener(
      'error',
      (error: RTCPeerConnectionIceErrorEvent) => {
        console.error('RTCError: ', error)
      }
    )
    channel.binaryType = 'arraybuffer'
    channel.addEventListener('open', async (ev) => {
      console.log('SCTP: ', connection.getTransceivers())
      // const MAX_SIZE = connection.sctp.maxMessageSize
      const arrayBuffer = await file.arrayBuffer()
      let i = 0
      console.log(arrayBuffer.byteLength)

      for (i; i < arrayBuffer.byteLength; i += MeetService.MAX_SIZE) {
        channel.send(arrayBuffer.slice(i, i + MeetService.MAX_SIZE))
      }
      channel.send(MeetService.END_OF_FILE)
    })
  }

  listenFile(connection?: RTCPeerConnection) {
    connection.createDataChannel('recchannel', {
      ordered: true,
    })
    connection.addEventListener('datachannel', ({ channel }) => {
      // console.log('SCTP: ', connection.sctp.maxMessageSize)

      channel.addEventListener(
        'error',
        (error: RTCPeerConnectionIceErrorEvent) => {
          console.error('RTCError: ', error)
        }
      )
      channel.binaryType = 'arraybuffer'
      const receiveBuffers: ArrayBuffer[] = []
      channel.addEventListener('message', async ({ data }) => {
        try {
          console.log(data.byteLength, data !== MeetService.END_OF_FILE)
          if (data !== MeetService.END_OF_FILE) {
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

      return connection
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
