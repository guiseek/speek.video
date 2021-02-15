export function stopStream(stream: MediaStream) {
  return stream && stream.getTracks().forEach((track) => track.stop())
}
