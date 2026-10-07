import AlertList from '../components/AlertList.jsx'
import BinPanel from '../components/BinPanel.jsx'
import Card from '../components/Card.jsx'
import DataState from '../components/DataState.jsx'
import OccupancyChart from '../components/OccupancyChart.jsx'
import PageHeader from '../components/PageHeader.jsx'
import { useServiceData } from '../hooks/useServiceData.js'
import { buscarOcupacao, buscarStatusLixeira } from '../services/lixeiraService.js'
import { formatarDataHora } from '../utils/formatters.js'
import estilos from './Page.module.css'

function StatusLixeira() {
  // Duas buscas independentes: cada uma tem seus próprios estados de carregamento e erro
  const status = useServiceData(buscarStatusLixeira)
  const ocupacao = useServiceData(buscarOcupacao)
  const lixeira = status.data

  return (
    <>
      <PageHeader titulo="Status da lixeira" descricao="Ocupação, conectividade, alertas e histórico de ocupação." />

      <DataState carregando={status.loading} erro={status.error}>
        {lixeira && (
          <div className={`${estilos.linha} ${estilos.metade}`}>
            <Card titulo="Nível atual">
              <BinPanel lixeira={lixeira} />
            </Card>

            <div className={estilos.pilha}>
              <Card titulo="Alertas">
                <AlertList alertas={lixeira.alertas} />
              </Card>
              <Card titulo="Informações">
                <dl className={estilos.informacoes}>
                  <div>
                    <dt>Dispositivo</dt>
                    <dd>{lixeira.nome}</dd>
                  </div>
                  <div>
                    <dt>Local</dt>
                    <dd>{lixeira.local}</dd>
                  </div>
                  <div>
                    <dt>Identificador</dt>
                    <dd>{lixeira.id}</dd>
                  </div>
                  <div>
                    <dt>Último esvaziamento</dt>
                    <dd>{formatarDataHora(lixeira.ultimoEsvaziamento)}</dd>
                  </div>
                </dl>
              </Card>
            </div>
          </div>
        )}
      </DataState>

      <DataState carregando={ocupacao.loading} erro={ocupacao.error}>
        {ocupacao.data && (
          <Card
            titulo="Ocupação ao longo do tempo"
            descricao="As linhas tracejadas marcam os níveis de atenção e crítico"
          >
            <OccupancyChart leituras={ocupacao.data.leituras} limiares={ocupacao.data.limiares} />
          </Card>
        )}
      </DataState>
    </>
  )
}

export default StatusLixeira
