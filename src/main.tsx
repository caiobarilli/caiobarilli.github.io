import React from 'react'
import { RouterProvider, createHashRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'

import App from './app'

import Home from '@/templates/Home'
// import About from '@/templates/About'
// import Jobs from '@/templates/Jobs'

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      // {
      //   path: '/about',
      //   element: <About />,
      // },
      // {
      //   path: '/jobs',
      //   element: <Jobs />,
      // },
    ],
  },
]

const router = createHashRouter(routes, {
  basename: '/',
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
