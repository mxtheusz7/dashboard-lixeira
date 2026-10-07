import { useState } from 'react'
import Card from '../components/Card.jsx'
import DataState from '../components/DataState.jsx'
import DescartesTable from '../components/DescartesTable.jsx'
import EmptyState from '../components/EmptyState.jsx'
import PageHeader from '../components/PageHeader.jsx'
import { useServiceData } from '../hooks/useServiceData.js'
import { buscarDescartes } from '../services/descartesService.js'
import estilos from './Page.module.css'

const TAMANHO_PAGINA = 20

function Conteudo({ registros }) {
  // "state": valores que, ao mudar, fazem o React redesenhar o componente
  const [categoria, setCategoria] = useState('todas')
  const [limite, setLimite] = useState(TAMANHO_PAGINA)

  if (registros.length === 0) {
    return <EmptyState titulo="Nenhum descarte registrado" descricao="O histórico aparece assim que houver registros." />
  }

  // Opções do filtro: categorias que realmente aparecem nos registros
  const opcoes = [...new Map(registros.map((r) => [r.categoria, r.categoriaNome]))]

  const filtrados = categoria === 'todas' ? registros : registros.filter((r) => r.categoria === categoria)
  const visiveis = filtrados.slice(0, limite)

  function aoMudarCategoria(evento) {
    setCategoria(evento.target.value)
    setLimite(TAMANHO_PAGINA) // volta ao início ao trocar o filtro
  }

  return (
    <Card>
      <div className={estilos.filtros}>
        <label htmlFor="filtro-categoria">Categoria</label>
        <select id="filtro-categoria" value={categoria} onChange={aoMudarCategoria}>
          <option value="todas">Todas</option>
          {opcoes.map(([id, nome]) => (
            <option key={id} value={id}>
              {nome}
            </option>
          ))}
        </select>
        <p className={estilos.contagem} role="status">
          Mostrando {visiveis.length} de {filtrados.length} registros
        </p>
      </div>

      {filtrados.length === 0 ? (
        <EmptyState titulo="Nenhum registro para este filtro" />
      ) : (
        <DescartesTable registros={visiveis} />
      )}

      {filtrados.length > visiveis.length && (
        <button type="button" className={estilos.botao} onClick={() => setLimite(limite + TAMANHO_PAGINA)}>
          Mostrar mais
        </button>
      )}
    </Card>
  )
}

function Historico() {
  const { data, loading, error } = useServiceData(buscarDescartes)

  return (
    <>
      <PageHeader titulo="Histórico" descricao="Todos os descartes identificados, do mais recente para o mais antigo." />
      <DataState carregando={loading} erro={error}>
        {data && <Conteudo registros={data} />}
      </DataState>
    </>
  )
}

export default Historico
