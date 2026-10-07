// Service da Visão Geral: reúne, numa única chamada, tudo o que a tela principal precisa.
// Pages/Components  ->  dashboardService  ->  outros services  ->  data (mocks)

import { buscarDescartes, buscarEvolucaoDiaria, buscarResumo } from './descartesService.js'
import { buscarEventos } from './eventosService.js'
import { buscarStatusLixeira } from './lixeiraService.js'

const QUANTIDADE_ULTIMOS_DESCARTES = 6
const QUANTIDADE_EVENTOS_RECENTES = 6

export async function buscarVisaoGeral() {
  // Promise.all dispara as buscas em paralelo e espera todas terminarem
  const [lixeira, resumo, evolucao, descartes, eventos] = await Promise.all([
    buscarStatusLixeira(),
    buscarResumo(),
    buscarEvolucaoDiaria(),
    buscarDescartes(),
    buscarEventos(),
  ])

  return {
    lixeira,
    resumo,
    evolucao,
    ultimosDescartes: descartes.slice(0, QUANTIDADE_ULTIMOS_DESCARTES),
    eventosRecentes: eventos.slice(0, QUANTIDADE_EVENTOS_RECENTES),
  }
}
