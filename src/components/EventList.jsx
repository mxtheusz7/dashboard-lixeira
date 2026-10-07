import { formatarDataHora } from '../utils/formatters.js'
import styles from './EventList.module.css'

const TIPOS = {
  classificacao: 'Classificação',
  ocupacao: 'Ocupação',
  dispositivo: 'Dispositivo',
  esvaziamento: 'Esvaziamento',
  sistema: 'Sistema',
}

const SEVERIDADES = {
  sucesso: 'Sucesso',
  alerta: 'Atenção',
  erro: 'Erro',
  info: 'Informação',
}

// Lista de eventos/logs. Cada evento: { id, timestamp, tipo, severidade, mensagem }
function EventList({ eventos }) {
  if (eventos.length === 0) {
    return <p className={styles.vazio}>Nenhum evento registrado.</p>
  }

  return (
    <ul className={styles.lista}>
      {eventos.map((evento) => (
        <li key={evento.id} className={styles.item}>
          <span className={`${styles.marcador} ${styles[evento.severidade] ?? styles.info}`} aria-hidden="true" />
          <div className={styles.texto}>
            <p>
              <span className="sr-only">{SEVERIDADES[evento.severidade] ?? 'Informação'}: </span>
              {evento.mensagem}
            </p>
            <p className={styles.meta}>
              {TIPOS[evento.tipo] ?? evento.tipo}, {formatarDataHora(evento.timestamp)}
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default EventList
