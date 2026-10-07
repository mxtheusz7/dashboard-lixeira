import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { formatarNumero, formatarPercentual } from '../utils/formatters.js'
import styles from './Chart.module.css'

// Gráfico de rosca: distribuição por categoria.
// Cada item: { id, nome, cor, quantidade, percentual }
function CategoryDonutChart({ categorias, rotuloCentro = 'resíduos' }) {
  const total = categorias.reduce((soma, c) => soma + c.quantidade, 0)
  const comDados = categorias.filter((c) => c.quantidade > 0)

  return (
    <div>
      <div className={`${styles.caixa} ${styles.caixaRosca}`}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={comDados}
              dataKey="quantidade"
              nameKey="nome"
              innerRadius="62%"
              outerRadius="92%"
              paddingAngle={2}
              stroke="none"
            >
              {comDados.map((categoria) => (
                <Cell key={categoria.id} fill={categoria.cor} />
              ))}
            </Pie>
            <Tooltip formatter={(valor, nome) => [formatarNumero(valor), nome]} />
          </PieChart>
        </ResponsiveContainer>
        <div className={styles.centro}>
          <strong>{formatarNumero(total)}</strong>
          <span>{rotuloCentro}</span>
        </div>
      </div>

      <ul className={`${styles.legenda} ${styles.legendaDetalhada}`}>
        {categorias.map((categoria) => (
          <li key={categoria.id}>
            <span className={styles.marcador} style={{ backgroundColor: categoria.cor }} aria-hidden="true" />
            <span>{categoria.nome}</span>
            <span>{formatarNumero(categoria.quantidade)}</span>
            <span className={styles.percentual}>{formatarPercentual(categoria.percentual)}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CategoryDonutChart
