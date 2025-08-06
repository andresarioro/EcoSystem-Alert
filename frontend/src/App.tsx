import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from './Components/HomePage'
import { Dashboard } from './Components/Dashboard'
import { GroupGraffics } from './Components/grafics/GroupGraffics'

export default function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/grafics' element={<GroupGraffics />}/>
      </Routes>
    </BrowserRouter>
  )
}
