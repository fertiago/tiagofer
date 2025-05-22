import React from 'react'

/**
 * Composant JoinButtons - Génère un groupe de boutons joinables
 * 
 * @param {Array} buttons - Tableau d'objets boutons avec leurs propriétés
 * @param {string} className - Classe CSS additionnelle pour le conteneur (défaut: "join-vertical")
 */
export default function JoinButtons({ buttons, className = "join-vertical" }) {
  return (
    <>
        <div className={`join ${className}`}>
            {buttons.map((button, index) => (
            <button 
              className={`btn join-item ${button.className || ''}`} 
              key={index} 
              data-answer-index={button.answerIndex}
              onClick={button.onClick}
              disabled={button.disabled}
            >
              {button.content}
            </button>
            ))}
        </div>
    </>
  )
}
