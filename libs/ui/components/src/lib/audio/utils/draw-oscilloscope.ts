interface CanvasStyle {
  fill?: string
  stroke?: string
}

export function drawOscilloscope(
  canvas: HTMLCanvasElement,
  analyser: AnalyserNode,
  style: CanvasStyle = {}
) {
  if (!(<any>canvas).isDestroyed) {
    requestAnimationFrame(() => {
      drawOscilloscope(canvas, analyser, style)
    })
  }

  const canvasCtx = <CanvasRenderingContext2D>(
    (<HTMLCanvasElement>canvas).getContext('2d')
  )

  const bufferLength = analyser.frequencyBinCount
  const dataArray = new Uint8Array(bufferLength)
  analyser.getByteTimeDomainData(dataArray)

  if (canvas.parentElement?.style.backgroundColor) {
    canvasCtx.fillStyle = canvas.parentElement?.style.backgroundColor
  }

  canvasCtx.fillStyle = style.fill ?? '#212121'
  canvasCtx.fillRect(0, 0, canvas.width, canvas.height)

  canvasCtx.lineWidth = 2
  canvasCtx.strokeStyle = style.stroke ?? '#bb86fc'

  canvasCtx.beginPath()

  var sliceWidth = (canvas.width * 1.0) / bufferLength
  var x = 0

  for (var i = 0; i < bufferLength; i++) {
    var v = dataArray[i] / 128.0
    var y = (v * canvas.height) / 2

    if (i === 0) {
      canvasCtx.moveTo(x, y)
    } else {
      canvasCtx.lineTo(x, y)
    }

    x += sliceWidth
  }

  canvasCtx.lineTo(canvas.width, canvas.height / 2)
  canvasCtx.stroke()
}
