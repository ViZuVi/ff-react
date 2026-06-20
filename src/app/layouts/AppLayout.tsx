import { Outlet } from 'react-router'
import { AppHeader } from '@/widgets/header/AppHeader'
import { useInitCurrentSpace } from '@/entities/space/hooks/use-init-current-space'
import { GlobalSnackbar } from '@/shared/components/GlobalSnackbar'

export const AppLayout = () => {
  useInitCurrentSpace()

  return (
    <div className="app-layout">

      <div className="content">
        <AppHeader />
        <main>
          <GlobalSnackbar />
          <Outlet />
        </main>
      </div>
    </div>
  )
}