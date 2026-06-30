import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ECommerce from './pages/ECommerce'
import './App.css'
import Tables from './pages/Tables'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tables" element={<Tables />} />
        <Route path="/ecommerce" element={<ECommerce />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
