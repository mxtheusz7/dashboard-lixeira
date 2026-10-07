import styles from './Card.module.css'

// Contêiner visual padrão: título opcional, descrição opcional e conteúdo (children).
function Card({ titulo, descricao, acao, className = '', children }) {
  return (
    <section className={`${styles.card} ${className}`}>
      {(titulo || acao) && (
        <header className={styles.cabecalho}>
          <div>
            {titulo && <h2 className={styles.titulo}>{titulo}</h2>}
            {descricao && <p className={styles.descricao}>{descricao}</p>}
          </div>
          {acao}
        </header>
      )}
      {children}
    </section>
  )
}

export default Card
