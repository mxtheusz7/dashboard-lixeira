import Card from '../components/Card.jsx'
import CategoryDonutChart from '../components/CategoryDonutChart.jsx'
import CategoryTable from '../components/CategoryTable.jsx'
import DataState from '../components/DataState.jsx'
import EmptyState from '../components/EmptyState.jsx'
import KpiCard from '../components/KpiCard.jsx'
import PageHeader from '../components/PageHeader.jsx'
import ProgressBar from '../components/ProgressBar.jsx'
import { useServiceData } from '../hooks/useServiceData.js'
import { buscarResumo } from '../services/descartesService.js'
import { formatarNumero, formatarPercentual } from '../utils/formatters.js'
import estilos from './Page.module.css'

function Conteudo({ resumo }) {
  if (resumo.total === 0) {
    return (
      <EmptyState
        titulo="Nenhuma classificação registrada"
        descricao="Os dados da IA aparecem aqui assim que houver descartes classificados."
      />
    )
  }

  const categoriasComDados = resumo.porCategoria.filter((c) => c.quantidade > 0).length

  return (
    <>
      <section className={estilos.kpis} aria-label="Indicadores da classificação">
        <KpiCard rotulo="Resíduos classificados" valor={formatarNumero(resumo.total)} />
        <KpiCard rotulo="Confiança média da IA" valor={formatarPercentual(resumo.confiancaMedia, 1)}>
          <ProgressBar percentual={resumo.confiancaMedia * 100} tom="sucesso" rotulo="Confiança média da IA" />
        </KpiCard>
        <KpiCard
          rotulo="Com baixa confiança"
          valor={formatarNumero(resumo.baixaConfianca)}
          detalhe={`${formatarPercentual(resumo.baixaConfianca / resumo.total, 1)} do total`}
        />
        <KpiCard
          rotulo="Categorias identificadas"
          valor={formatarNumero(categoriasComDados)}
          detalhe={`de ${resumo.porCategoria.length} categorias`}
        />
      </section>

      <div className={`${estilos.linha} ${estilos.estreita}`}>
        <Card titulo="Distribuição por categoria">
          <CategoryDonutChart categorias={resumo.porCategoria} />
        </Card>
        <Card titulo="Desempenho por categoria" descricao="Quantidade, participação e confiança média da IA">
          <CategoryTable categorias={resumo.porCategoria} />
        </Card>
      </div>
    </>
  )
}

function Classificacao() {
  const { data, loading, error } = useServiceData(buscarResumo)

  return (
    <>
      <PageHeader
        titulo="Classificação por IA"
        descricao="Categorias identificadas pela visão computacional e a confiança de cada classificação."
      />
      <DataState carregando={loading} erro={error}>
        {data && <Conteudo resumo={data} />}
      </DataState>
    </>
  )
}

export default Classificacao
