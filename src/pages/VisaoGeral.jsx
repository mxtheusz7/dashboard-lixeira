import { Link } from 'react-router-dom'
import BinPanel from '../components/BinPanel.jsx'
import Card from '../components/Card.jsx'
import CategoryDonutChart from '../components/CategoryDonutChart.jsx'
import DailyStackedChart from '../components/DailyStackedChart.jsx'
import DataState from '../components/DataState.jsx'
import DescartesTable from '../components/DescartesTable.jsx'
import EmptyState from '../components/EmptyState.jsx'
import EventList from '../components/EventList.jsx'
import KpiCard from '../components/KpiCard.jsx'
import PageHeader from '../components/PageHeader.jsx'
import ProgressBar from '../components/ProgressBar.jsx'
import StatusLixeiraBadge from '../components/StatusLixeiraBadge.jsx'
import { useServiceData } from '../hooks/useServiceData.js'
import { buscarVisaoGeral } from '../services/dashboardService.js'
import { formatarDataHora, formatarDiaMes, formatarNumero, formatarPercentual } from '../utils/formatters.js'
import estilos from './Page.module.css'

const TOM_OCUPACAO = { normal: 'sucesso', alerta: 'alerta', critico: 'erro' }

function Conteudo({ dados }) {
  const { lixeira, resumo, evolucao, ultimosDescartes, eventosRecentes } = dados

  if (resumo.total === 0) {
    return (
      <EmptyState
        titulo="Nenhum resíduo classificado ainda"
        descricao="Os indicadores aparecem assim que a lixeira registrar o primeiro descarte."
      />
    )
  }

  const periodo = resumo.periodo.inicio
    ? `${formatarDiaMes(resumo.periodo.inicio)} a ${formatarDiaMes(resumo.periodo.fim)}`
    : ''
  const participacao = (quantidade) => `${formatarPercentual(quantidade / resumo.total)} do total`

  return (
    <>
      <section className={`${estilos.kpis} ${estilos.kpisSeis}`} aria-label="Indicadores principais">
        <KpiCard rotulo="Resíduos identificados" valor={formatarNumero(resumo.total)} detalhe={`Período de ${periodo}`} />
        <KpiCard
          rotulo="Recicláveis"
          cor="var(--color-success)"
          valor={formatarNumero(resumo.porGrupo.reciclavel)}
          detalhe={participacao(resumo.porGrupo.reciclavel)}
        />
        <KpiCard
          rotulo="Orgânicos"
          cor="var(--color-cat-organico)"
          valor={formatarNumero(resumo.porGrupo.organico)}
          detalhe={participacao(resumo.porGrupo.organico)}
        />
        <KpiCard
          rotulo="Não recicláveis"
          cor="var(--color-cat-rejeito)"
          valor={formatarNumero(resumo.porGrupo.nao_reciclavel)}
          detalhe={participacao(resumo.porGrupo.nao_reciclavel)}
        />
        <KpiCard
          rotulo="Ocupação da lixeira"
          valor={`${lixeira.ocupacaoPercentual}%`}
          detalhe={`Atenção a partir de ${lixeira.limiares.alerta}%`}
        >
          <ProgressBar
            percentual={lixeira.ocupacaoPercentual}
            tom={TOM_OCUPACAO[lixeira.nivelOcupacao]}
            rotulo="Ocupação da lixeira"
          />
        </KpiCard>
        <KpiCard
          rotulo="Status da lixeira"
          valor={<StatusLixeiraBadge status={lixeira.status} rotulo={lixeira.statusRotulo} />}
          detalhe={`Atualizado em ${formatarDataHora(lixeira.ultimaAtualizacao)}`}
        />
      </section>

      <div className={`${estilos.linha} ${estilos.larga}`}>
        <Card titulo="Descartes por dia" descricao="Quantidade de resíduos identificados, por categoria">
          <DailyStackedChart dias={evolucao.dias} categorias={evolucao.categorias} />
        </Card>
        <Card titulo="Estado da lixeira">
          <BinPanel lixeira={lixeira} />
        </Card>
      </div>

      <div className={`${estilos.linha} ${estilos.estreita}`}>
        <Card titulo="Distribuição por categoria">
          <CategoryDonutChart categorias={resumo.porCategoria} />
        </Card>
        <Card
          titulo="Últimos registros"
          acao={
            <Link to="/historico" className={estilos.link}>
              Ver histórico completo
            </Link>
          }
        >
          <DescartesTable registros={ultimosDescartes} />
        </Card>
      </div>

      <Card
        titulo="Eventos recentes"
        acao={
          <Link to="/eventos" className={estilos.link}>
            Ver todos os eventos
          </Link>
        }
      >
        <EventList eventos={eventosRecentes} />
      </Card>
    </>
  )
}

function VisaoGeral() {
  const { data, loading, error } = useServiceData(buscarVisaoGeral)

  return (
    <>
      <PageHeader titulo="Visão geral" descricao="Resumo da classificação de resíduos e do estado da lixeira." />
      <DataState carregando={loading} erro={error}>
        {data && <Conteudo dados={data} />}
      </DataState>
    </>
  )
}

export default VisaoGeral
