import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * Composant Header - Barre de navigation avec système de thème clair/sombre
 * Permet la navigation entre les différentes pages et la personnalisation de l'interface
 */
const Header = () => {
  // État local pour le thème (clair/sombre)
  const [theme, setTheme] = useState('light');
  
  // Récupération de l'emplacement actuel dans l'application pour le surlignage du menu
  const location = useLocation();
  const activePage = location.pathname;

  // Configuration des routes disponibles dans la navigation
  const pages = [
    { name: 'Home', path: '/' },
    { name: 'Contact', path: '/contact/' },
    { name: 'Calculatrice', path: '/calculatrice/' },
  ];

  /**
   * Détermine si une page doit être affichée comme active dans la navigation
   * 
   * @param {string} pagePath - Chemin de la page à vérifier
   * @returns {boolean} - Vrai si la page est active
   */
  const isPageActive = (pagePath) => {
    if (pagePath === '/' && activePage === '/') {
      // Cas spécifique pour la page d'accueil (correspondance exacte uniquement)
      return true;
    } else if (pagePath !== '/' && activePage.startsWith(pagePath)) {
      // Pour les autres pages, vérifie si la route actuelle commence par le chemin
      return true;
    }
    return false;
  };

  /**
   * Gère la bascule entre les thèmes clair et sombre
   * 
   * @param {Event} e - Événement de changement du bouton toggle
   */
  const handleThemeChange = (e) => {
    const newTheme = e.target.checked ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  /**
   * Initialisation du thème au chargement
   */
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.body.classList.add(savedTheme);
    
    return () => {
      document.body.classList.remove('light', 'dark');
    };
  }, []);

  return (
    <div className="flex justify-between items-center w-full p-4">
      <div role="tablist" className="tabs tabs-lift px-2">
        {pages.map((page) => (
          <Link
            key={page.path}
            role="tab"
            className={`tab${isPageActive(page.path) ? ' tab-active' : ''}`}
            to={page.path}
          >
            {page.name}
          </Link>
        ))}
      </div>

      <label className="swap swap-rotate p-2">
        <input
          type="checkbox"
          className="theme-controller"
          value={theme}
          checked={theme === 'dark'}
          onChange={handleThemeChange}
          id="theme-swap"
        />

        <svg
          className="swap-off h-10 w-10 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
        </svg>

        <svg
          className="swap-on h-10 w-10 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
        </svg>
      </label>
    </div>
  );
};

export default Header;
