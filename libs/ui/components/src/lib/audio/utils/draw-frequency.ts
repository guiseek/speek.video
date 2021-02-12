import { CanvasStyle } from '@speek/core/entity'

function hexToRgba(hex: string, alpha: number = 1) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)

  return `rgba(${r},${g},${b},${alpha})`
}

function changeColor(bar: number, hex: string) {
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgb(${bar},${g},${b})`

}
export function drawFrequency(
  canvas: HTMLCanvasElement,
  analyser: AnalyserNode,
  style: CanvasStyle = {}
) {
  if (!(<any>canvas).isDestroyed) {
    requestAnimationFrame(() => {
      drawFrequency(canvas, analyser)
    })
  }

  const canvasCtx = <CanvasRenderingContext2D>canvas.getContext('2d')

  const bufferLength = analyser.frequencyBinCount
  const dataArray = new Uint8Array(bufferLength)
  analyser.getByteFrequencyData(dataArray)

  // canvasCtx.fillStyle = 'rgb(242, 242, 242)'
  canvasCtx.fillStyle = style.fill ?? '#212121'
  canvasCtx.fillRect(0, 0, canvas.width, canvas.height)

  var barWidth = (canvas.width / bufferLength) * 2.5
  var barHeight
  var x = 0

  for (var i = 0; i < bufferLength; i++) {
    barHeight = dataArray[i] / 2

    canvasCtx.fillStyle = changeColor(barHeight + 100, '#bb86fc')
    // canvasCtx.fillStyle = 'rgb(' + (barHeight + 100) + ',134,252)'
    canvasCtx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight)

    x += barWidth + 1
  }
}
