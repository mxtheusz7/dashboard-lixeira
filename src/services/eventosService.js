// Service de eventos/logs do sistema.
// Junta eventos do sistema (data/eventos.js) com eventos de classificação,
// montados a partir dos descartes mais recentes.

import { eventos } from '../data/eventos.js'
import { formatarPercentual } from '../utils/formatters.js'
import { buscarDescartes } from './descartesService.js'

const QUANTIDADE_EVENTOS_CLASSIFICACAO = 8

function eventoDeClassificacao(descarte) {
  const confianca = formatarPercentual(descarte.confianca)
  const baixaConfianca = descarte.status === 'baixa_confianca'
  return {
    id: `evt-${descarte.id}`,
    timestamp: descarte.timestamp,
    tipo: 'classificacao',
    severidade: baixaConfianca ? 'alerta' : 'sucesso',
    mensagem: baixaConfianca
      ? `Classificação com baixa confiança: ${descarte.categoriaNome} (${confianca}).`
      : `Resíduo classificado como ${descarte.categoriaNome} (${confianca}).`,
  }
}

export async function buscarEventos() {
  const registros = await buscarDescartes()
  const deClassificacao = registros
    .slice(0, QUANTIDADE_EVENTOS_CLASSIFICACAO)
    .map(eventoDeClassificacao)

  return [...structuredClone(eventos), ...deClassificacao].sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp),
  )
}
