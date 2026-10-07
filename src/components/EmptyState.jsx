import styles from './EmptyState.module.css'

// Mensagem exibida quando a busca funcionou, mas não há dados para mostrar.
function EmptyState({ titulo, descricao }) {
  return (
    <div className={styles.vazio}>
      <p className={styles.titulo}>{titulo}</p>
      {descricao && <p className={styles.descricao}>{descricao}</p>}
    </div>
  )
}

export default EmptyState
