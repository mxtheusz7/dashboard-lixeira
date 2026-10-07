// Estado atual da lixeira (DADOS FICTÍCIOS).
// Campos provisórios: o contrato real será definido com o responsável pelo Firebase.
// "ocupacaoPercentual" depende de o hardware fornecer essa leitura.

export const lixeira = {
  id: 'lixeira-01',
  nome: 'Lixeira Inteligente 01',
  local: 'Ponto de coleta 01',
  status: 'operacional', // 'operacional' | 'offline'
  ocupacaoPercentual: 78,
  ultimaAtualizacao: '2026-10-07T09:30:00-03:00',
  ultimoEsvaziamento: '2026-10-04T17:30:00-03:00',
}
