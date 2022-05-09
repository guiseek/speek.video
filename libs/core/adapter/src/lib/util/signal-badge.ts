export const peerSignalBadge: Record<RTCSignalingState, string> = {
  closed: 'fechado',
  'have-local-offer': 'informações locais coletadas',
  'have-local-pranswer': 'avaliando o melhor caminho',
  'have-remote-offer': 'recebemos sugestões de caminhos',
  'have-remote-pranswer': 'caminho encontrado',
  stable: 'estável',
}
