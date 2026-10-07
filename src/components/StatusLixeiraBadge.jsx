import StatusBadge from './StatusBadge.jsx'

const TONS = { operacional: 'sucesso', offline: 'erro' }

// Etiqueta do status da lixeira (operacional/offline), reutilizada em várias telas.
function StatusLixeiraBadge({ status, rotulo }) {
  return <StatusBadge tom={TONS[status] ?? 'neutro'}>{rotulo}</StatusBadge>
}

export default StatusLixeiraBadge
