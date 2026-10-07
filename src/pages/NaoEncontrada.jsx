import { Link } from 'react-router-dom'
import EmptyState from '../components/EmptyState.jsx'
import PageHeader from '../components/PageHeader.jsx'

// Exibida quando o endereço não corresponde a nenhuma rota
function NaoEncontrada() {
  return (
    <>
      <PageHeader titulo="Página não encontrada" />
      <EmptyState titulo="Este endereço não existe no painel." descricao="Use o menu lateral para navegar." />
      <p style={{ marginTop: 'var(--space-4)', textAlign: 'center' }}>
        <Link to="/">Voltar à visão geral</Link>
      </p>
    </>
  )
}

export default NaoEncontrada
