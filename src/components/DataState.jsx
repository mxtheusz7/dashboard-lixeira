import styles from './DataState.module.css'

// Trata os três estados de qualquer busca de dados: carregando, erro e sucesso.
// Se não houver erro nem carregamento, exibe o conteúdo (children).
function DataState({ carregando, erro, children }) {
  if (carregando) {
    return (
      <div className={styles.estado} role="status">
        <span className={styles.spinner} aria-hidden="true" />
        Carregando dados...
      </div>
    )
  }

  if (erro) {
    return (
      <div className={`${styles.estado} ${styles.erro}`} role="alert">
        <strong>Não foi possível carregar os dados.</strong>
        <span>{erro.message}</span>
      </div>
    )
  }

  return children
}

export default DataState
