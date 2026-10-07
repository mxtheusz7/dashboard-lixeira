import { Area, AreaChart, CartesianGrid, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import styles from './Chart.module.css'

const TICK = { fontSize: 12, fill: 'var(--color-text-muted)' }

// Evolução da ocupação (0 a 100%) com linhas de referência para os limiares.
// leituras: [{ rotulo, percentual }]   limiares: { alerta, critico }
function OccupancyChart({ leituras, limiares }) {
  return (
    <div className={styles.caixa}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={leituras} margin={{ top: 8, right: 8, bottom: 0, left: -12 }}>
          <CartesianGrid vertical={false} stroke="var(--color-border)" strokeDasharray="3 3" />
          <XAxis dataKey="rotulo" tickLine={false} axisLine={false} tick={TICK} minTickGap={32} />
          <YAxis
            domain={[0, 100]}
            ticks={[0, 25, 50, 75, 100]}
            tickFormatter={(valor) => `${valor}%`}
            tickLine={false}
            axisLine={false}
            tick={TICK}
          />
          <Tooltip formatter={(valor) => [`${valor}%`, 'Ocupação']} />
          <ReferenceLine y={limiares.alerta} stroke="var(--color-warning)" strokeDasharray="5 4" />
          <ReferenceLine y={limiares.critico} stroke="var(--color-danger)" strokeDasharray="5 4" />
          <Area
            type="monotone"
            dataKey="percentual"
            name="Ocupação"
            stroke="var(--color-primary)"
            strokeWidth={2}
            fill="var(--color-primary-soft)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default OccupancyChart
