import styles from './StatusBadge.module.css'

// Etiqueta colorida. tom: 'sucesso' | 'alerta' | 'erro' | 'info' | 'neutro'
function StatusBadge({ tom = 'neutro', children }) {
  return <span className={`${styles.badge} ${styles[tom]}`}>{children}</span>
}

export default StatusBadge
