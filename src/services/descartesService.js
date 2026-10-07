// Service de descartes: é a ÚNICA porta de acesso aos dados de descartes/classificações.
// Hoje lê de src/data; na Etapa 2 passa a consultar o Firebase. Os formatos de retorno
// (o "contrato" com a interface) devem permanecer os mesmos.

import { categorias, grupos } from '../data/categorias.js'
import { descartes } from '../data/descartes.js'
import { chaveDia, formatarDiaMes } from '../utils/formatters.js'
import { respostaMock } from './mockApi.js'

const categoriaPorId = new Map(categorias.map((c) => [c.id, c]))
const grupoPorId = new Map(grupos.map((g) => [g.id, g]))

// Acrescenta nome, cor e grupo da categoria ao registro bruto.
// Se aparecer uma categoria desconhecida, mostramos o próprio id em vez de quebrar.
function enriquecer(descarte) {
  const categoria = categoriaPorId.get(descarte.categoria)
  const grupo = grupoPorId.get(categoria?.grupo)
  return {
    ...descarte,
    categoriaNome: categoria?.nome ?? descarte.categoria,
    cor: categoria?.cor ?? 'var(--color-text-muted)',
    grupo: grupo?.id ?? null,
    grupoNome: grupo?.nome ?? 'Não definido',
  }
}

const media = (valores) =>
  valores.length ? valores.reduce((soma, v) => soma + v, 0) / valores.length : 0

// Lista completa, do mais recente para o mais antigo
export function buscarDescartes() {
  const lista = descartes
    .map(enriquecer)
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
  return respostaMock(lista)
}

// Totais e indicadores gerais
export function buscarResumo() {
  const lista = descartes.map(enriquecer)
  const total = lista.length

  const porGrupo = Object.fromEntries(
    grupos.map((g) => [g.id, lista.filter((d) => d.grupo === g.id).length]),
  )

  const porCategoria = categorias.map((c) => {
    const itens = lista.filter((d) => d.categoria === c.id)
    return {
      id: c.id,
      nome: c.nome,
      cor: c.cor,
      grupo: c.grupo,
      grupoNome: grupoPorId.get(c.grupo)?.nome ?? 'Não definido',
      quantidade: itens.length,
      percentual: total ? itens.length / total : 0,
      confiancaMedia: media(itens.map((d) => d.confianca)),
    }
  })

  const dias = lista.map((d) => chaveDia(d.timestamp)).sort()

  return respostaMock({
    total,
    porGrupo,
    porCategoria,
    confiancaMedia: media(lista.map((d) => d.confianca)),
    baixaConfianca: lista.filter((d) => d.status === 'baixa_confianca').length,
    periodo: { inicio: dias[0] ?? null, fim: dias[dias.length - 1] ?? null },
  })
}

// Quantidade de descartes por dia e por categoria (para o gráfico de evolução)
export function buscarEvolucaoDiaria() {
  const porDia = new Map()

  for (const descarte of descartes) {
    const dia = chaveDia(descarte.timestamp)
    if (!porDia.has(dia)) {
      porDia.set(dia, {
        data: dia,
        rotulo: formatarDiaMes(dia),
        total: 0,
        ...Object.fromEntries(categorias.map((c) => [c.id, 0])),
      })
    }
    const linha = porDia.get(dia)
    linha.total += 1
    if (descarte.categoria in linha) linha[descarte.categoria] += 1
  }

  const dias = [...porDia.values()].sort((a, b) => a.data.localeCompare(b.data))

  return respostaMock({
    categorias: categorias.map(({ id, nome, cor }) => ({ id, nome, cor })),
    dias,
  })
}
