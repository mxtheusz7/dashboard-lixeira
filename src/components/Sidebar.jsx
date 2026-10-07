import { NavLink } from 'react-router-dom'
import Icon from './Icon.jsx'
import styles from './Sidebar.module.css'

const ITENS = [
  { para: '/', rotulo: 'Visão geral', icone: 'visao-geral' },
  { para: '/classificacao', rotulo: 'Classificação por IA', icone: 'classificacao' },
  { para: '/historico', rotulo: 'Histórico', icone: 'historico' },
  { para: '/lixeira', rotulo: 'Status da lixeira', icone: 'lixeira' },
  { para: '/eventos', rotulo: 'Eventos', icone: 'eventos' },
]

// Menu lateral. Em telas pequenas ele fica escondido e abre sobre o conteúdo.
function Sidebar({ aberta, aoFechar }) {
  return (
    <>
      <aside className={`${styles.sidebar} ${aberta ? styles.aberta : ''}`}>
        <div className={styles.marca}>
          <span className={styles.logo}>
            <Icon nome="lixeira" tamanho={22} />
          </span>
          <div>
            <p className={styles.nome}>Lixeira Inteligente</p>
            <p className={styles.subtitulo}>Painel de monitoramento</p>
          </div>
          <button type="button" className={styles.fechar} onClick={aoFechar} aria-label="Fechar menu">
            <Icon nome="fechar" />
          </button>
        </div>

        <nav aria-label="Navegação principal">
          <ul className={styles.lista}>
            {ITENS.map((item) => (
              <li key={item.para}>
                {/* NavLink troca de página sem recarregar e informa se o link está ativo */}
                <NavLink
                  to={item.para}
                  end={item.para === '/'}
                  onClick={aoFechar}
                  className={({ isActive }) => `${styles.link} ${isActive ? styles.ativo : ''}`}
                >
                  <Icon nome={item.icone} />
                  {item.rotulo}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <p className={styles.rodape}>Projeto de TCC em Smart City</p>
      </aside>

      {aberta && <div className={styles.fundo} onClick={aoFechar} aria-hidden="true" />}
    </>
  )
}

export default Sidebar
