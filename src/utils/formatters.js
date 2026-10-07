// Funções de formatação (datas, números, percentuais).
// Todas as datas são exibidas no fuso de São Paulo, para que a dashboard
// mostre o mesmo horário em qualquer computador (e nos screenshots do TCC).

const FUSO = 'America/Sao_Paulo'

export function formatarData(iso) {
  return new Date(iso).toLocaleDateString('pt-BR', {
    timeZone: FUSO,
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export function formatarHora(iso) {
  return new Date(iso).toLocaleTimeString('pt-BR', {
    timeZone: FUSO,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

export function formatarDataHora(iso) {
  return `${formatarData(iso)} ${formatarHora(iso)}`
}

// "2026-10-07T09:30:00-03:00" -> "07/10 09:30"
export function formatarDiaMesHora(iso) {
  const diaMes = new Date(iso).toLocaleDateString('pt-BR', {
    timeZone: FUSO,
    day: '2-digit',
    month: '2-digit',
  })
  return `${diaMes} ${formatarHora(iso)}`
}

// Chave do dia no fuso local, no formato "AAAA-MM-DD" (usada para agrupar por dia)
export function chaveDia(iso) {
  return new Date(iso).toLocaleDateString('en-CA', { timeZone: FUSO })
}

// "2026-10-07" -> "07/10"
export function formatarDiaMes(chave) {
  const [, mes, dia] = chave.split('-')
  return `${dia}/${mes}`
}

export function formatarNumero(valor) {
  return Number(valor).toLocaleString('pt-BR')
}

// 0.934 -> "93%"  (recebe uma fração entre 0 e 1)
export function formatarPercentual(fracao, casas = 0) {
  return `${(fracao * 100).toFixed(casas).replace('.', ',')}%`
}
