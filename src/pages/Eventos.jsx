import Card from '../components/Card.jsx'
import DataState from '../components/DataState.jsx'
import EventList from '../components/EventList.jsx'
import PageHeader from '../components/PageHeader.jsx'
import { useServiceData } from '../hooks/useServiceData.js'
import { buscarEventos } from '../services/eventosService.js'

function Eventos() {
  const { data, loading, error } = useServiceData(buscarEventos)

  return (
    <>
      <PageHeader titulo="Eventos" descricao="Registro de ocorrências do sistema, do mais recente para o mais antigo." />
      <DataState carregando={loading} erro={error}>
        {data && (
          <Card>
            <EventList eventos={data} />
          </Card>
        )}
      </DataState>
    </>
  )
}

export default Eventos
