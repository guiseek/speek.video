export const peerStateBadge: Record<RTCPeerConnectionState, string> = {
  new: 'iniciando',
  failed: 'falhou',
  closed: 'aguardando',
  connected: 'conectado',
  connecting: 'conectando...',
  disconnected: 'desconectado',
}
