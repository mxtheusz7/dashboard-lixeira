import styles from './PageHeader.module.css'

function PageHeader({ titulo, descricao }) {
  return (
    <div className={styles.cabecalho}>
      <h1 className={styles.titulo}>{titulo}</h1>
      {descricao && <p className={styles.descricao}>{descricao}</p>}
    </div>
  )
}

export default PageHeader
