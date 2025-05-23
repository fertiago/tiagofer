import React, { useState, forwardRef, useImperativeHandle, useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';

const InputSection = forwardRef(({ 
  onSubmit, 
  onSubmitForm, 
  inputVisible = true, 
  isSubmitMode = false,
  onReset
}, ref) => {
  const [inputValue, setInputValue] = useState('');
  const buttonRef = useRef(null);


  useImperativeHandle(ref, () => ({
    animate: () => animateButton()
  }));

  // Anime le bouton à chaque changement de mode
  useEffect(() => {
    if (buttonRef.current) {
      animateButton();
    }
  }, [isSubmitMode]);

  // Clique sur le bouton d'envoi
  const handleButtonClick = () => {
    if (isSubmitMode) {
      onSubmitForm();
    } else {
      const success = onSubmit(inputValue);
      if (success) {
        setInputValue('');
      }
    }
  };

  // Gère la touche "Entrée" pour envoyer le message si non en mode soumission
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isSubmitMode) {
      const success = onSubmit(inputValue);
      if (success) {
        setInputValue('');
      }
    }
  };

  const animateButton = () => {
    anime({
      targets: buttonRef.current,
      scale: [0.9, 1],
      opacity: [0.5, 1],
      duration: 400,
      easing: 'easeOutElastic(1, .5)'
    });
  };

  return (
    <section id="contact-send" className="p-6 mt-2 mb-6 w-full max-w-2xl mx-auto">
      <div className="flex gap-2 w-full max-w-6xl mx-auto">
        {inputVisible && (
          <input
            type="text"
            placeholder="Type here"
            className="input w-full flex-grow"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        )}
        <button
          ref={buttonRef}
          className="btn btn-primary"
          onClick={handleButtonClick}
        >
          {isSubmitMode 
            ? (inputVisible ? 'Nouveau message' : 'Confirmer et envoyer')
            : 'Envoyer'
          }
        </button>
      </div>
    </section>
  );
});

export default InputSection;
