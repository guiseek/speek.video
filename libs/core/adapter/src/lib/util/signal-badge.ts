export const peerSignalBadge: Record<RTCSignalingState, string> = {
  closed: 'Fechado',
  'have-local-offer': 'Proposta carregada',
  'have-local-pranswer': 'Resposta remota aceita',
  'have-remote-offer': 'Proposta remota carregada',
  'have-remote-pranswer': 'Proposta remota aceita',
  stable: 'Estável',
}
