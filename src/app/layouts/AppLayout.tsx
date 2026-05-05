import { Outlet } from 'react-router'
import { AppHeader } from '../../widgets/header/AppHeader'

// import { TheHeader } from '@/widgets/header/TheHeader.tsx'
// import { Sidebar } from '@/widgets/sidebar'

export const AppLayout = () => {
  return (
    <div className="app-layout">
      {/* <Sidebar /> */}

      <div className="content">
        <AppHeader />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}