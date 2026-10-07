// Histórico de descartes (DADOS FICTÍCIOS).
//
// Em vez de escrever centenas de linhas à mão, usamos um gerador DETERMINÍSTICO:
// com a mesma "semente" ele produz sempre os mesmos registros. Assim a dashboard
// fica igual a cada execução e os screenshots do TCC são reproduzíveis.
//
// Formato de cada registro (provisório, a confirmar com o grupo):
//   { id, lixeiraId, timestamp (ISO 8601), categoria (id), confianca (0 a 1), status }

import { categorias } from './categorias.js'

// Perfil fictício de cada categoria: peso (frequência) e confiança típica da IA
const PERFIS = {
  plastico: { peso: 28, confianca: 0.93 },
  papel: { peso: 20, confianca: 0.91 },
  metal: { peso: 10, confianca: 0.9 },
  vidro: { peso: 8, confianca: 0.88 },
  organico: { peso: 22, confianca: 0.86 },
  rejeito: { peso: 12, confianca: 0.8 },
}

// Abaixo deste valor o registro é marcado como "baixa_confianca"
const LIMIAR_BAIXA_CONFIANCA = 0.75

// Dias simulados e quantidade de descartes em cada um
const DIAS = [
  { data: '2026-10-01', quantidade: 21 },
  { data: '2026-10-02', quantidade: 24 },
  { data: '2026-10-03', quantidade: 27 },
  { data: '2026-10-04', quantidade: 19 },
  { data: '2026-10-05', quantidade: 23 },
  { data: '2026-10-06', quantidade: 26 },
  { data: '2026-10-07', quantidade: 9 },
]

// Gerador pseudoaleatório (mulberry32): devolve números entre 0 e 1
function criarGerador(semente) {
  let estado = semente
  return function proximo() {
    estado = (estado + 0x6d2b79f5) | 0
    let t = Math.imul(estado ^ (estado >>> 15), 1 | estado)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const dois = (n) => String(n).padStart(2, '0')

function sortearCategoria(aleatorio) {
  const somaPesos = categorias.reduce((soma, c) => soma + PERFIS[c.id].peso, 0)
  let alvo = aleatorio() * somaPesos
  for (const c of categorias) {
    alvo -= PERFIS[c.id].peso
    if (alvo <= 0) return c.id
  }
  return categorias[categorias.length - 1].id
}

function sortearConfianca(aleatorio, categoriaId) {
  // Soma de 3 sorteios aproxima uma distribuição "em sino" em torno da confiança típica
  const ruido = (aleatorio() + aleatorio() + aleatorio() - 1.5) * 0.09
  const valor = PERFIS[categoriaId].confianca + ruido
  return Math.round(Math.min(0.995, Math.max(0.55, valor)) * 1000) / 1000
}

function gerarDescartes() {
  const aleatorio = criarGerador(2026)
  const registros = []

  for (const dia of DIAS) {
    const ultimoDia = dia.data === DIAS[DIAS.length - 1].data
    const inicioMin = 6 * 60 + 30 // 06:30
    const fimMin = ultimoDia ? 9 * 60 + 25 : 21 * 60 + 30 // até 09:25 no último dia

    const minutos = Array.from({ length: dia.quantidade }, () =>
      Math.floor(inicioMin + aleatorio() * (fimMin - inicioMin)),
    ).sort((a, b) => a - b)

    for (const minuto of minutos) {
      const categoria = sortearCategoria(aleatorio)
      const confianca = sortearConfianca(aleatorio, categoria)
      registros.push({
        lixeiraId: 'lixeira-01',
        timestamp: `${dia.data}T${dois(Math.floor(minuto / 60))}:${dois(minuto % 60)}:00-03:00`,
        categoria,
        confianca,
        status: confianca < LIMIAR_BAIXA_CONFIANCA ? 'baixa_confianca' : 'classificado',
      })
    }
  }

  return registros.map((registro, indice) => ({
    id: `desc-${String(indice + 1).padStart(4, '0')}`,
    ...registro,
  }))
}

export const descartes = gerarDescartes()
