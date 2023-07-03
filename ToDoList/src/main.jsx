import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Tasks from './App.jsx'
import ErrorPage from './ErrorPage.jsx'
import MoreInfo from '../components/MoreInfo.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Tasks />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/tasks/:taskId",
    element: <MoreInfo />,
    errorElement: <ErrorPage />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router = {router} />
  </React.StrictMode>,
)
