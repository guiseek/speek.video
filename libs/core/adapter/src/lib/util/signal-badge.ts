export const peerSignalBadge: Record<RTCSignalingState, string> = {
  closed: 'fechado',
  'have-local-offer': 'preparando comunicação',
  'have-local-pranswer': 'avaliando caminhos',
  'have-remote-offer': 'sugerindo caminhos',
  'have-remote-pranswer': 'caminho encontrado',
  stable: 'estável',
}
