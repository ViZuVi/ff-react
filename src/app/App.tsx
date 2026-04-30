import { Outlet } from 'react-router'

// import { Header } from '@/widgets/header'
// import { Sidebar } from '@/widgets/sidebar'

export const AppLayout = () => {
  return (
    <div className="app-layout">
      {/* <Sidebar /> */}

      <div className="content">
        {/* <Header /> */}
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}