import { formatarDataHora, formatarPercentual } from '../utils/formatters.js'
import StatusBadge from './StatusBadge.jsx'
import styles from './DescartesTable.module.css'

const STATUS = {
  classificado: { rotulo: 'Classificado', tom: 'sucesso' },
  baixa_confianca: { rotulo: 'Baixa confiança', tom: 'alerta' },
}

// Tabela de descartes. Cada registro: { id, timestamp, categoriaNome, cor, confianca, status }
function DescartesTable({ registros }) {
  return (
    <div className={styles.rolagem}>
      <table className={styles.tabela}>
        <thead>
          <tr>
            <th scope="col">Data e hora</th>
            <th scope="col">Categoria</th>
            <th scope="col" className={styles.numero}>
              Confiança da IA
            </th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {registros.map((registro) => {
            const status = STATUS[registro.status] ?? { rotulo: registro.status, tom: 'neutro' }
            return (
              <tr key={registro.id}>
                <td>{formatarDataHora(registro.timestamp)}</td>
                <td>
                  <span className={styles.categoria}>
                    <span className={styles.marcador} style={{ backgroundColor: registro.cor }} aria-hidden="true" />
                    {registro.categoriaNome}
                  </span>
                </td>
                <td className={styles.numero}>{formatarPercentual(registro.confianca, 1)}</td>
                <td>
                  <StatusBadge tom={status.tom}>{status.rotulo}</StatusBadge>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default DescartesTable
