import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Footer } from '../components/footer/footer'
import { Header } from '../components/header/header'

export const Route = createRootRoute({
  component: () => (
    <MantineProvider>
      <Header />
      <div className="w-full h-screen p-4">
        <Outlet />
      </div>
      <Footer />
      <TanStackRouterDevtools />
    </MantineProvider>
  ),
})