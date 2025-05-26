import React, { useState, useEffect } from 'react';

// Composant pour l'affichage de la calculatrice
const Display = ({ currentInput, previousInput, operation }) => {
  return (
    <div className="p-6 pb-4 text-right bg-base-200 rounded-t-3xl">
      <div className="text-xl min-h-8 overflow-hidden text-ellipsis">
        {previousInput && operation ? `${previousInput}${operation}` : ''}
      </div>
      <div className="text-base-content text-5xl font-semibold mt-1 overflow-hidden text-ellipsis">
        {currentInput}
      </div>
    </div>
  );
};

// Composant pour un bouton de calculatrice
const CalcButton = ({ onClick, children, variant }) => {
  // Base styles communs à tous les boutons
  const baseStyles = "w-full h-[60px] m-[2px] min-w-[60px] text-xl rounded-xl cursor-pointer transition-all duration-200 ease-in-out hover:-translate-y-0.5 active:translate-y-0";
  
  // Styles spécifiques selon le type de bouton
  const variantStyles = {
    number: "bg-base-300 text-base-content hover:bg-opacity-85",
    operation: "bg-primary text-primary-content font-bold hover:bg-opacity-85",
    equals: "bg-secondary text-secondary-content font-bold hover:bg-opacity-85",
    clear: "bg-base-300 text-error font-bold hover:bg-opacity-85"
  };
  
  return (
    <td className="p-0">
      <button
        onClick={onClick}
        className={`${baseStyles} ${variantStyles[variant] || ''}`}
      >
        {children}
      </button>
    </td>
  );
};

// Composant principal de la calculatrice
export default function Calculatrice() {
  // États de la calculatrice
  const [currentInput, setCurrentInput] = useState('0');
  const [previousInput, setPreviousInput] = useState('');
  const [operation, setOperation] = useState(null);
  const [resetScreen, setResetScreen] = useState(false);

  // Fonction pour gérer les entrées numériques
  const inputNumber = (number) => {
    if (currentInput === '0' && number !== '.') {
      setCurrentInput(number);
    } else if (resetScreen) {
      setCurrentInput(number);
      setResetScreen(false);
    } else {
      // Empêche d'ajouter plusieurs points décimaux
      if (number === '.' && currentInput.includes('.')) return;
      setCurrentInput(currentInput + number);
    }
  };

  // Fonction pour gérer les opérations
  const handleOperation = (op) => {
    if (currentInput === '0' && !previousInput) return;

    if (operation !== null) {
      calculate();
    }

    setPreviousInput(currentInput);
    setOperation(op);
    setResetScreen(true);
  };

  // Fonction pour calculer le résultat
  const calculate = () => {
    if (!operation || !previousInput) return;

    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    switch (operation) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '*':
        result = prev * current;
        break;
      case '/':
        if (current === 0) {
          result = 'Erreur';
        } else {
          result = prev / current;
        }
        break;
      case '%':
        result = (prev * current) / 100;
        break;
      default:
        return;
    }

    setCurrentInput(result.toString());
    setOperation(null);
    setPreviousInput('');
    setResetScreen(true);
  };

  // Fonction pour effacer la calculatrice
  const clear = () => {
    setCurrentInput('0');
    setPreviousInput('');
    setOperation(null);
    setResetScreen(false);
  };

  // Fonction pour supprimer le dernier chiffre
  const deleteNumber = () => {
    if (currentInput.length === 1 || currentInput === 'Erreur') {
      setCurrentInput('0');
    } else {
      setCurrentInput(currentInput.slice(0, -1));
    }
  };

  // Gestion des entrées clavier
  useEffect(() => {
    const handleKeyboardInput = (e) => {
      // Touches numériques et décimale
      if (/^\d$/.test(e.key) || e.key === '.') {
        e.preventDefault();
        inputNumber(e.key);
      }
      // Touche 00
      else if (e.key === '0' && e.altKey) {
        e.preventDefault();
        inputNumber('00');
      }
      // Touches d'opération
      else if (['+', '-', '*', '/', '%'].includes(e.key)) {
        e.preventDefault();
        handleOperation(e.key);
      }
      // Touche égal ou Entrée
      else if (e.key === '=' || e.key === 'Enter') {
        e.preventDefault();
        calculate();
      }
      // Touche retour arrière pour supprimer
      else if (e.key === 'Backspace') {
        e.preventDefault();
        deleteNumber();
      }
      // Touche Échap ou Delete pour effacer
      else if (e.key === 'Escape' || e.key === 'Delete') {
        e.preventDefault();
        clear();
      }
    };

    window.addEventListener('keydown', handleKeyboardInput);
    return () => {
      window.removeEventListener('keydown', handleKeyboardInput);
    };
  }, [currentInput, previousInput, operation]);

  return (
    <div className="max-h-screen flex items-center justify-center p-4">
      <div className="max-w-[340px] w-full rounded-3xl shadow-lg overflow-hidden bg-base-200">
        {/* Écran de la calculatrice */}
        <Display 
          currentInput={currentInput} 
          previousInput={previousInput} 
          operation={operation} 
        />

        {/* Boutons de la calculatrice */}
        <div className="p-4">
          <table className="w-full border-spacing-5">
            {/* Première rangée */}
            <tbody>
              <tr>
                <CalcButton onClick={clear} variant="clear">
                  AC
                </CalcButton>
                <CalcButton onClick={deleteNumber} variant="clear">
                  DEL
                </CalcButton>
                <CalcButton onClick={() => handleOperation('%')} variant="operation">
                  %
                </CalcButton>
                <CalcButton onClick={() => handleOperation('/')} variant="operation">
                  /
                </CalcButton>
              </tr>

              {/* Deuxième rangée */}
              <tr>
                <CalcButton onClick={() => inputNumber('7')} variant="number">
                  7
                </CalcButton>
                <CalcButton onClick={() => inputNumber('8')} variant="number">
                  8
                </CalcButton>
                <CalcButton onClick={() => inputNumber('9')} variant="number">
                  9
                </CalcButton>
                <CalcButton onClick={() => handleOperation('*')} variant="operation">
                  *
                </CalcButton>
              </tr>

              {/* Troisième rangée */}
              <tr>
                <CalcButton onClick={() => inputNumber('4')} variant="number">
                  4
                </CalcButton>
                <CalcButton onClick={() => inputNumber('5')} variant="number">
                  5
                </CalcButton>
                <CalcButton onClick={() => inputNumber('6')} variant="number">
                  6
                </CalcButton>
                <CalcButton onClick={() => handleOperation('-')} variant="operation">
                  -
                </CalcButton>
              </tr>

              {/* Quatrième rangée */}
              <tr>
                <CalcButton onClick={() => inputNumber('1')} variant="number">
                  1
                </CalcButton>
                <CalcButton onClick={() => inputNumber('2')} variant="number">
                  2
                </CalcButton>
                <CalcButton onClick={() => inputNumber('3')} variant="number">
                  3
                </CalcButton>
                <CalcButton onClick={() => handleOperation('+')} variant="operation">
                  +
                </CalcButton>
              </tr>

              {/* Cinquième rangée */}
              <tr>
                <CalcButton onClick={() => inputNumber('0')} variant="number">
                  0
                </CalcButton>
                <CalcButton onClick={() => inputNumber('00')} variant="number">
                  00
                </CalcButton>
                <CalcButton onClick={() => inputNumber('.')} variant="number">
                  .
                </CalcButton>
                <CalcButton onClick={calculate} variant="equals">
                  =
                </CalcButton>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
