export const peerStateBadge: Record<RTCPeerConnectionState, string> = {
  new: 'iniciando conexão',
  failed: 'nossa conexão falhou',
  closed: 'aguardando para conexão',
  connected: 'estamos conectados',
  connecting: 'estamos conectando...',
  disconnected: 'estamos desconectados',
}
