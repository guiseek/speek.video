export const peerSignalBadge: Record<RTCSignalingState, string> = {
  closed: 'fechado',
  'have-local-offer': 'proposta carregada',
  'have-local-pranswer': 'resposta remota aceita',
  'have-remote-offer': 'proposta remota carregada',
  'have-remote-pranswer': 'proposta remota aceita',
  stable: 'estável',
}
