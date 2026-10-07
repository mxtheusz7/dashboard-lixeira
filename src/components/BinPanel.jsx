import { formatarDataHora, formatarNumero } from '../utils/formatters.js'
import BinLevel from './BinLevel.jsx'
import StatusBadge from './StatusBadge.jsx'
import StatusLixeiraBadge from './StatusLixeiraBadge.jsx'
import styles from './BinPanel.module.css'

const NIVEIS = {
  normal: { rotulo: 'Nível normal', tom: 'sucesso' },
  alerta: { rotulo: 'Nível de atenção', tom: 'alerta' },
  critico: { rotulo: 'Nível crítico', tom: 'erro' },
}

// Painel com a lixeira desenhada, a ocupação e os dados principais do estado atual.
function BinPanel({ lixeira }) {
  const nivel = NIVEIS[lixeira.nivelOcupacao] ?? NIVEIS.normal

  return (
    <div className={styles.painel}>
      <BinLevel
        percentual={lixeira.ocupacaoPercentual}
        nivel={lixeira.nivelOcupacao}
        limiarAlerta={lixeira.limiares.alerta}
        limiarCritico={lixeira.limiares.critico}
      />
      <div className={styles.dados}>
        <p className={styles.percentual}>{lixeira.ocupacaoPercentual}%</p>
        <p className={styles.legenda}>de ocupação</p>
        <StatusBadge tom={nivel.tom}>{nivel.rotulo}</StatusBadge>

        <dl className={styles.lista}>
          <div>
            <dt>Status</dt>
            <dd>
              <StatusLixeiraBadge status={lixeira.status} rotulo={lixeira.statusRotulo} />
            </dd>
          </div>
          <div>
            <dt>Última atualização</dt>
            <dd>{formatarDataHora(lixeira.ultimaAtualizacao)}</dd>
          </div>
          <div>
            <dt>Resíduos desde o esvaziamento</dt>
            <dd>{formatarNumero(lixeira.residuosDesdeEsvaziamento)}</dd>
          </div>
        </dl>
      </div>
    </div>
  )
}

export default BinPanel
