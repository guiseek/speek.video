export function stopStream(stream: MediaStream) {
  return stream.getTracks().forEach((track) => track.stop())
}
