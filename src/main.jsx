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

// Fonction pour ajouter ou modifier la balise link icon
function setFavicon(iconPath = '/database.svg') {
  // Supprimer les icônes existantes
  const existingIcons = document.querySelectorAll('link[rel*="icon"]');
  existingIcons.forEach(icon => icon.remove());
  
  // Créer une nouvelle balise link pour l'icône
  const link = document.createElement('link');
  link.rel = 'icon';
  link.type = 'image/svg+xml';
  link.href = iconPath;
  
  // Ajouter la balise au head
  document.head.appendChild(link);
  
  console.log('Favicon configuré avec succès :', iconPath);
}

// Configurer l'icône au chargement
setFavicon();

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
