import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import styles from './Chart.module.css'

const TICK = { fontSize: 12, fill: 'var(--color-text-muted)' }

// Barras empilhadas: quantidade de descartes por dia, dividida por categoria.
// dias: [{ rotulo, plastico: 4, papel: 3, ... }]   categorias: [{ id, nome, cor }]
function DailyStackedChart({ dias, categorias }) {
  return (
    <div>
      <div className={styles.caixa}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={dias} margin={{ top: 8, right: 8, bottom: 0, left: -12 }}>
            <CartesianGrid vertical={false} stroke="var(--color-border)" strokeDasharray="3 3" />
            <XAxis dataKey="rotulo" tickLine={false} axisLine={false} tick={TICK} />
            <YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={TICK} />
            <Tooltip cursor={{ fill: 'var(--color-background)' }} />
            {categorias.map((categoria) => (
              <Bar key={categoria.id} dataKey={categoria.id} name={categoria.nome} stackId="dia" fill={categoria.cor} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      <ul className={styles.legenda}>
        {categorias.map((categoria) => (
          <li key={categoria.id}>
            <span className={styles.marcador} style={{ backgroundColor: categoria.cor }} aria-hidden="true" />
            {categoria.nome}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DailyStackedChart
