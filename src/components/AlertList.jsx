import styles from './AlertList.module.css'

const CLASSES = { erro: 'erro', alerta: 'alerta', info: 'info' }

// Lista de alertas ativos. Cada alerta: { id, severidade, mensagem }
function AlertList({ alertas }) {
  if (alertas.length === 0) {
    return <p className={styles.semAlertas}>Nenhum alerta ativo.</p>
  }

  return (
    <ul className={styles.lista}>
      {alertas.map((alerta) => (
        <li key={alerta.id} className={`${styles.item} ${styles[CLASSES[alerta.severidade] ?? 'info']}`}>
          {alerta.mensagem}
        </li>
      ))}
    </ul>
  )
}

export default AlertList
