import styles from './BinLevel.module.css'

// Desenho de uma lixeira que se enche conforme a ocupação.
// nivel: 'normal' | 'alerta' | 'critico' (define a cor do preenchimento).
// As linhas tracejadas marcam os limiares de atenção e de nível crítico.
function BinLevel({ percentual, nivel = 'normal', limiarAlerta, limiarCritico }) {
  const valor = Math.min(100, Math.max(0, percentual))

  return (
    <div className={styles.lixeira} role="img" aria-label={`Ocupação da lixeira: ${valor}%`}>
      <div className={styles.tampa} />
      <div className={styles.corpo}>
        <div className={`${styles.nivel} ${styles[nivel]}`} style={{ height: `${valor}%` }} />
        {limiarAlerta != null && <div className={styles.marca} style={{ bottom: `${limiarAlerta}%` }} />}
        {limiarCritico != null && <div className={styles.marca} style={{ bottom: `${limiarCritico}%` }} />}
      </div>
    </div>
  )
}

export default BinLevel
