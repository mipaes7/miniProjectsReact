import { lazy, Suspense } from 'react'

// import { HomePage } from './pages/Home'
// import { AboutPage } from './pages/About'
import { Page404 } from './pages/404'

import { Router } from './Router'
import { Route } from './Route'

const LazyAboutPage = lazy(() => import('./pages/About.jsx'))
const LazyHomePage = lazy(() => import('./pages/Home.jsx'))

const routes = [
  // {
  //   path: '/',
  //   Component: HomePage
  // },
  // {
  //   path: '/about',
  //   Component: AboutPage
  // },
  {
    path: '/search/:query',
    Component: ({ routeParams }) => <h1>SearchComponent {routeParams.query}</h1>
  },
]

export function App() {

  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}> 
        <Router routes={routes} defaulComponent={Page404}>
          <Route path='/' Component={LazyHomePage} />
          <Route path='/about' Component={LazyAboutPage} />
        </Router>
      </Suspense>
    </main>
  )
}