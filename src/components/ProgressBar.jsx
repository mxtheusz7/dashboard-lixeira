import styles from './ProgressBar.module.css'

// Barra de progresso. percentual: 0 a 100. tom: 'primario' | 'sucesso' | 'alerta' | 'erro'
function ProgressBar({ percentual, tom = 'primario', rotulo, fina = false }) {
  const valor = Math.min(100, Math.max(0, percentual))
  return (
    <div
      className={`${styles.trilho} ${fina ? styles.fina : ''}`}
      role="progressbar"
      aria-label={rotulo}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(valor)}
    >
      <div className={`${styles.preenchimento} ${styles[tom]}`} style={{ width: `${valor}%` }} />
    </div>
  )
}

export default ProgressBar
