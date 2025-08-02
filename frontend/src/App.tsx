import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from './Components/HomePage'
import { Dashboard } from './Components/Dashboard'

export default function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}
