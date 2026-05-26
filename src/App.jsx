import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Pastes from './components/Pastes'
import Viewpaste from './components/Viewpaste'
import { Toaster } from 'react-hot-toast'


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Navbar />
        <Home />
      </div>
    )
  },
  {
    path: "/pastes",
    element: (
      <div>
        <Navbar />
        <Pastes />
      </div>
    )
  },
  {
    path: "/pastes/:id",
    element: (
      <div>
        <Navbar />
        <Viewpaste />
      </div>
    )
  }
])

function App() {
  return (
    <div >
      <RouterProvider router={router} />
      <Toaster/>
    </div>
  )
}

export default App