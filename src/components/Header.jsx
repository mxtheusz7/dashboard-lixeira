import { formatarDataHora } from '../utils/formatters.js'
import Icon from './Icon.jsx'
import StatusBadge from './StatusBadge.jsx'
import StatusLixeiraBadge from './StatusLixeiraBadge.jsx'
import styles from './Header.module.css'

// Barra superior: identifica a lixeira monitorada e mostra seu status.
// "lixeira" pode ser null enquanto os dados ainda estão carregando.
function Header({ lixeira, aoAbrirMenu }) {
  return (
    <header className={styles.header}>
      <button type="button" className={styles.menu} onClick={aoAbrirMenu} aria-label="Abrir menu de navegação">
        <Icon nome="menu" />
      </button>

      <div className={styles.identificacao}>
        <p className={styles.nome}>{lixeira ? lixeira.nome : 'Lixeira Inteligente'}</p>
        {lixeira && (
          <p className={styles.detalhe}>
            {lixeira.local}. Atualizado em {formatarDataHora(lixeira.ultimaAtualizacao)}
          </p>
        )}
      </div>

      <div className={styles.status}>
        {lixeira && <StatusLixeiraBadge status={lixeira.status} rotulo={lixeira.statusRotulo} />}
        {lixeira?.origemDados === 'simulado' && <StatusBadge tom="info">Dados simulados</StatusBadge>}
      </div>
    </header>
  )
}

export default Header
