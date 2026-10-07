import styles from './KpiCard.module.css'

// Indicador numérico. "cor" (opcional) pinta um pequeno marcador ao lado do rótulo.
// Como o valor da cor muda a cada uso, ele vai em "style"; o restante fica no CSS Module.
function KpiCard({ rotulo, valor, detalhe, cor, children }) {
  return (
    <article className={styles.kpi}>
      <p className={styles.rotulo}>
        {cor && <span className={styles.marcador} style={{ backgroundColor: cor }} aria-hidden="true" />}
        {rotulo}
      </p>
      <div className={styles.valor}>{valor}</div>
      {detalhe && <p className={styles.detalhe}>{detalhe}</p>}
      {children}
    </article>
  )
}

export default KpiCard
