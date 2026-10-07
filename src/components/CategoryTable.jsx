import { formatarNumero, formatarPercentual } from '../utils/formatters.js'
import ProgressBar from './ProgressBar.jsx'
import styles from './CategoryTable.module.css'

// Faixas visuais PROVISÓRIAS para a confiança média (apenas apresentação)
function tomDaConfianca(fracao) {
  if (fracao >= 0.85) return 'sucesso'
  if (fracao >= 0.75) return 'alerta'
  return 'erro'
}

// Resumo por categoria. Cada item: { id, nome, cor, grupoNome, quantidade, percentual, confiancaMedia }
function CategoryTable({ categorias }) {
  return (
    <div className={styles.rolagem}>
      <table className={styles.tabela}>
        <thead>
          <tr>
            <th scope="col">Categoria</th>
            <th scope="col">Grupo</th>
            <th scope="col" className={styles.numero}>
              Quantidade
            </th>
            <th scope="col">Participação</th>
            <th scope="col">Confiança média</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria) => (
            <tr key={categoria.id}>
              <td>
                <span className={styles.categoria}>
                  <span className={styles.marcador} style={{ backgroundColor: categoria.cor }} aria-hidden="true" />
                  {categoria.nome}
                </span>
              </td>
              <td>{categoria.grupoNome}</td>
              <td className={styles.numero}>{formatarNumero(categoria.quantidade)}</td>
              <td>
                <div className={styles.barra}>
                  <ProgressBar
                    fina
                    percentual={categoria.percentual * 100}
                    rotulo={`Participação de ${categoria.nome}`}
                  />
                  <span>{formatarPercentual(categoria.percentual)}</span>
                </div>
              </td>
              <td>
                <div className={styles.barra}>
                  <ProgressBar
                    fina
                    tom={tomDaConfianca(categoria.confiancaMedia)}
                    percentual={categoria.confiancaMedia * 100}
                    rotulo={`Confiança média de ${categoria.nome}`}
                  />
                  <span>{formatarPercentual(categoria.confiancaMedia, 1)}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CategoryTable
