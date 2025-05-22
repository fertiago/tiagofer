import React from 'react'

/**
 * Composant Modal - Affiche une boîte de dialogue modale personnalisable
 * 
 * @param {string} id - Identifiant unique de la modale
 * @param {string} buttonText - Texte du bouton qui ouvre la modale
 * @param {string} title - Titre affiché dans la modale
 * @param {string} content - Contenu principal de la modale
 * @param {Array} buttons - Boutons additionnels à afficher dans la modale
 */
export default function Modal({ id, buttonText = "Open modal", title, content, buttons = [] }) {
  // Identifiant unique pour cibler le modal avec getElementById
  const modalId = id || `modal-${Math.random().toString(36).substr(2, 9)}`;
  
  // Gestion de l'ouverture de la modale
  const openModal = () => {
    document.getElementById(modalId).showModal();
  };

  return (
    <>
        <button className="btn " onClick={openModal}>{buttonText}</button>
        
        <dialog id={modalId} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
            <h3 className="font-bold text-lg">{title}</h3>
            
            <p className="py-4">{content}</p>
            
            <div className="modal-action">
                {buttons.map((button, index) => (
                  <React.Fragment key={index}>{button}</React.Fragment>
                ))}
                
                <form method="dialog">
                    <button className="btn">Close</button>
                </form>
            </div>
        </div>
        </dialog>
    </>
  )
}

