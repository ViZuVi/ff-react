import { Outlet } from 'react-router'
import { AppHeader } from '@/widgets/header/AppHeader'
import { useInitCurrentSpace } from '@/entities/space/hooks/use-init-current-space'

export const AppLayout = () => {
  useInitCurrentSpace()

  return (
    <div className="app-layout">

      <div className="content">
        <AppHeader />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}