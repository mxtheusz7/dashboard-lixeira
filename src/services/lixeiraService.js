// Service da lixeira: estado atual, alertas e histórico de ocupação.

import { lixeira } from '../data/lixeira.js'
import { leiturasOcupacao } from '../data/ocupacao.js'
import { formatarDiaMesHora } from '../utils/formatters.js'
import { buscarDescartes } from './descartesService.js'
import { respostaMock } from './mockApi.js'

// Limiares PROVISÓRIOS de ocupação (a confirmar com o grupo)
const LIMIAR_ALERTA = 70
const LIMIAR_CRITICO = 90

const ROTULOS_STATUS = { operacional: 'Operacional', offline: 'Offline' }
const UMA_HORA_MS = 60 * 60 * 1000

function nivelDaOcupacao(percentual) {
  if (percentual >= LIMIAR_CRITICO) return 'critico'
  if (percentual >= LIMIAR_ALERTA) return 'alerta'
  return 'normal'
}

export async function buscarStatusLixeira() {
  // O status combina o dado da lixeira com informações derivadas dos descartes.
  const registros = await buscarDescartes()

  const referencia = new Date(lixeira.ultimaAtualizacao).getTime()
  const ultimoEsvaziamento = new Date(lixeira.ultimoEsvaziamento).getTime()

  const residuosDesdeEsvaziamento = registros.filter(
    (r) => new Date(r.timestamp).getTime() > ultimoEsvaziamento,
  ).length

  const baixaConfianca24h = registros.filter((r) => {
    const instante = new Date(r.timestamp).getTime()
    return (
      r.status === 'baixa_confianca' &&
      instante <= referencia &&
      instante >= referencia - 24 * UMA_HORA_MS
    )
  }).length

  const nivelOcupacao = nivelDaOcupacao(lixeira.ocupacaoPercentual)

  const alertas = []
  if (lixeira.status === 'offline') {
    alertas.push({
      id: 'offline',
      severidade: 'erro',
      mensagem: 'A lixeira está sem comunicação com o sistema.',
    })
  }
  if (nivelOcupacao === 'critico') {
    alertas.push({
      id: 'ocupacao',
      severidade: 'erro',
      mensagem: `Ocupação crítica (${lixeira.ocupacaoPercentual}%). Esvaziamento necessário.`,
    })
  } else if (nivelOcupacao === 'alerta') {
    alertas.push({
      id: 'ocupacao',
      severidade: 'alerta',
      mensagem: `Ocupação em ${lixeira.ocupacaoPercentual}%. Programe o esvaziamento.`,
    })
  }
  if (baixaConfianca24h > 0) {
    alertas.push({
      id: 'baixa-confianca',
      severidade: 'info',
      mensagem:
        baixaConfianca24h === 1
          ? '1 classificação com baixa confiança nas últimas 24 horas.'
          : `${baixaConfianca24h} classificações com baixa confiança nas últimas 24 horas.`,
    })
  }

  return {
    ...lixeira,
    statusRotulo: ROTULOS_STATUS[lixeira.status] ?? lixeira.status,
    nivelOcupacao,
    residuosDesdeEsvaziamento,
    alertas,
    limiares: { alerta: LIMIAR_ALERTA, critico: LIMIAR_CRITICO },
    origemDados: 'simulado', // a interface exibe um aviso quando os dados são simulados
  }
}

export function buscarOcupacao() {
  const leituras = leiturasOcupacao.map((leitura) => ({
    ...leitura,
    rotulo: formatarDiaMesHora(leitura.timestamp),
  }))
  return respostaMock({
    leituras,
    limiares: { alerta: LIMIAR_ALERTA, critico: LIMIAR_CRITICO },
  })
}
