import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout.jsx'
import Classificacao from './pages/Classificacao.jsx'
import Eventos from './pages/Eventos.jsx'
import Historico from './pages/Historico.jsx'
import NaoEncontrada from './pages/NaoEncontrada.jsx'
import StatusLixeira from './pages/StatusLixeira.jsx'
import VisaoGeral from './pages/VisaoGeral.jsx'

// Define quais páginas existem e em que endereço cada uma aparece.
// Todas as rotas filhas são desenhadas dentro do MainLayout (sidebar + header).
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<VisaoGeral />} />
          <Route path="classificacao" element={<Classificacao />} />
          <Route path="historico" element={<Historico />} />
          <Route path="lixeira" element={<StatusLixeira />} />
          <Route path="eventos" element={<Eventos />} />
          <Route path="*" element={<NaoEncontrada />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
