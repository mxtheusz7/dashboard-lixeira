import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header.jsx'
import Sidebar from '../components/Sidebar.jsx'
import { useServiceData } from '../hooks/useServiceData.js'
import { buscarStatusLixeira } from '../services/lixeiraService.js'
import styles from './MainLayout.module.css'

// Moldura comum a todas as telas: sidebar + header + área de conteúdo.
// O <Outlet /> é o "buraco" onde o React Router encaixa a página da rota atual.
function MainLayout() {
  const [menuAberto, setMenuAberto] = useState(false)
  const { data: lixeira } = useServiceData(buscarStatusLixeira)

  return (
    <div className={styles.app}>
      <Sidebar aberta={menuAberto} aoFechar={() => setMenuAberto(false)} />
      <div className={styles.principal}>
        <Header lixeira={lixeira} aoAbrirMenu={() => setMenuAberto(true)} />
        <main className={styles.conteudo}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default MainLayout
