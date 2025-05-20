import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './pages/App.jsx'
import Header from './components/Header'
import Footer from './components/Footer'
import Contact from './pages/Contact'
import Calculatrice from './pages/Calculatrice'
import './styles/index.css'
import './styles/themes.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Header/>
      <main>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/contact/" element={<Contact />} />
          <Route path="/calculatrice/" element={<Calculatrice />} />
        </Routes>
      </main>
      <Footer/>
    </BrowserRouter>
  </StrictMode>,
)
