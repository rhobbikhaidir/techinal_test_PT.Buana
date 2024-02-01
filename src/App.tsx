import { Route, Routes } from 'react-router-dom'
import Home from 'pages/home/home'
import './App.css'
import DetailPage from 'pages/detail/detail'

function App() {
  
  return (
    <Routes>
      <Route element={<Home />}  path='/'/>
      <Route element={<DetailPage />}  path='/detail/:id'/>

    </Routes>
  )
}
export default App
