// Eventos do sistema (DADOS FICTÍCIOS), exceto classificações.
// Os eventos de classificação são montados pelo eventosService a partir dos descartes.
//
// tipo: 'ocupacao' | 'dispositivo' | 'esvaziamento' | 'sistema'
// severidade: 'info' | 'sucesso' | 'alerta' | 'erro'

export const eventos = [
  {
    id: 'evt-sis-01',
    timestamp: '2026-10-07T09:12:00-03:00',
    tipo: 'ocupacao',
    severidade: 'alerta',
    mensagem: 'Ocupação atingiu 75% (nível de atenção).',
  },
  {
    id: 'evt-dis-02',
    timestamp: '2026-10-07T06:02:00-03:00',
    tipo: 'dispositivo',
    severidade: 'sucesso',
    mensagem: 'Dispositivo reconectado à rede Wi-Fi.',
  },
  {
    id: 'evt-dis-01',
    timestamp: '2026-10-07T05:58:00-03:00',
    tipo: 'dispositivo',
    severidade: 'erro',
    mensagem: 'Conexão com o dispositivo perdida.',
  },
  {
    id: 'evt-esv-01',
    timestamp: '2026-10-04T17:30:00-03:00',
    tipo: 'esvaziamento',
    severidade: 'sucesso',
    mensagem: 'Lixeira esvaziada. Ocupação reiniciada.',
  },
  {
    id: 'evt-ocu-03',
    timestamp: '2026-10-04T15:05:00-03:00',
    tipo: 'ocupacao',
    severidade: 'erro',
    mensagem: 'Ocupação atingiu 94% (nível crítico).',
  },
  {
    id: 'evt-ocu-02',
    timestamp: '2026-10-03T18:40:00-03:00',
    tipo: 'ocupacao',
    severidade: 'alerta',
    mensagem: 'Ocupação atingiu 80% (nível de atenção).',
  },
  {
    id: 'evt-sis-00',
    timestamp: '2026-10-01T06:55:00-03:00',
    tipo: 'sistema',
    severidade: 'info',
    mensagem: 'Monitoramento iniciado.',
  },
]
