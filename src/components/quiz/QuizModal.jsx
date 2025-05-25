import React, { useEffect, useRef, useState } from 'react';
import Timeline from '../Timeline';

const QuizModal = ({ 
  isOpen, 
  onClose, 
  questions, 
  correctAnswers, 
  progress, 
  onRestartQuiz,
  onAnswerSelect,
  answeredQuestions,
  onBrutforceQuiz
}) => {
  const scrollContainerRef = useRef(null);
  const [brutforceLog, setBrutforceLog] = useState([]);
  const [isBrutforcing, setIsBrutforcing] = useState(false);
  
  // Effet pour faire défiler vers le bas quand une réponse est sélectionnée
  useEffect(() => {
    if (scrollContainerRef.current) {
      // Un délai court pour s'assurer que le DOM est mis à jour avant de défiler
      setTimeout(() => {
        scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
      }, 100);
    }
  }, [answeredQuestions]); // Se déclenche quand les questions répondues changent
  
  // Effet pour faire défiler vers le bas quand le log de bruteforce est mis à jour
  useEffect(() => {
    if (scrollContainerRef.current && brutforceLog.length > 0) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [brutforceLog]);
  
  const handleBrutforceClick = () => {
    setIsBrutforcing(true);
    setBrutforceLog([{ type: 'info', message: '🚀 Démarrage du bruteforce...' }]);
    
    // Fonction pour logger les étapes de bruteforce
    const logAction = (message, type = 'info') => {
      setBrutforceLog(prevLog => [...prevLog, { type, message }]);
    };
    
    // Appeler la fonction de bruteforce depuis le composant parent
    if (onBrutforceQuiz) {
      onBrutforceQuiz(logAction);
    }
  };
  
  // Nouvelle fonction pour gérer le redémarrage du quiz
  const handleRestart = () => {
    // Réinitialiser les logs du bruteforce et l'état bruteforcing
    setBrutforceLog([]);
    setIsBrutforcing(false);
    
    // Appeler la fonction de redémarrage fournie par le parent
    if (onRestartQuiz) {
      onRestartQuiz();
    }
  };
  
  if (!isOpen) return null;

  return (
    <dialog id="quiz_modal" className="modal" open={isOpen}>
      <div className="modal-box">
        <h3 className="text-lg font-bold">QUIZ!</h3>
        <form method="dialog" id="quiz_form" className="modal-action flex flex-col gap-4" onSubmit={onClose}>
          <div 
            ref={scrollContainerRef}
            className="h-[400px] overflow-y-auto pr-2 custom-scrollbar" 
            id="quiz-container"
          >
            {isBrutforcing && brutforceLog.length > 0 ? (
              <div className="bg-base-300 p-3 rounded-lg mb-4">
                <h4 className="font-bold mb-2">Log de Bruteforce</h4>
                <div className="text-sm space-y-1">
                  {brutforceLog.map((log, index) => (
                    <div 
                      key={index} 
                      className={`${
                        log.type === 'success' ? 'text-success' : 
                        log.type === 'warning' ? 'text-warning' : 
                        log.type === 'error' ? 'text-error' : 
                        log.type === 'improvement' ? 'text-primary' :
                        log.type === 'locked' ? 'text-secondary' :
                        ''
                      }`}
                    >
                      {log.message}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <Timeline 
                questions={questions} 
                onAnswerSelect={onAnswerSelect}
                answeredQuestions={answeredQuestions}
              />
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4 my-4 p-4 bg-base-200 rounded-lg shadow-inner">
            <div className="text-center">
              <div className="text-2xl font-bold" id="correct-answers">{correctAnswers}</div>
              <div className="text-sm">Bonnes réponses</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold" id="progress">{progress}%</div>
              <div className="text-sm">Progression</div>
            </div>
          </div>
          
          <div className="flex justify-between mt-2">
            <div className="flex gap-2">
              <button type="button" id="restart-quiz" className="btn btn-primary" onClick={handleRestart}>
                Recommencer
              </button>
              {onBrutforceQuiz && (
                <button 
                  type="button" 
                  id="brutforce-quiz" 
                  className="btn btn-secondary" 
                  onClick={handleBrutforceClick}
                  disabled={isBrutforcing}
                >
                  {isBrutforcing ? 'En cours...' : 'Bruteforce'}
                </button>
              )}
            </div>
            <button type="submit" className="btn">Fermer</button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default QuizModal;
