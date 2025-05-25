import React, { useEffect, useRef, useState } from 'react';
import JoinButtons from '../JoinButtons';
import unvalidatedSvg from '../../assets/unvalidated.svg';
import validatedSvg from '../../assets/validated.svg';
import apertureSvg from '../../assets/aperture.svg';


const QuestionItem = ({ question, count, onAnswerSelect, isAnswered, answeredQuestions }) => {
  // Configuration de l'alternance gauche/droite dans la timeline
  const isLeft = count % 2 === 0;
  const posClass = isLeft ? 'timeline-start' : 'timeline-end';
  const itemRef = useRef(null);
  
  // État local pour suivre la réponse sélectionnée par l'utilisateur
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  
  // Récupération des données de réponse pour cette question spécifique
  const answer = answeredQuestions?.[question.id];
  const hasAnswered = isAnswered || !!answer;

  // Effet pour réinitialiser l'état local lorsque isAnswered passe de true à false
  useEffect(() => {
    if (!isAnswered && !answer) {
      setSelectedAnswerIndex(null);
    }
  }, [isAnswered, answer]);
  
  // Effet pour appliquer une animation d'entrée progressive à chaque élément de la timeline
  useEffect(() => {
    const item = itemRef.current;
    if (item) {
      // Délai progressif basé sur la position pour créer un effet de cascade
      setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      }, count * 100);
    }
  }, [count]);

  // Fonction appelée lorsque l'utilisateur clique sur une réponse
  const handleAnswerClick = (answerIndex) => {
    // Vérifie que la question n'a pas déjà été répondue
    if (onAnswerSelect && !hasAnswered) {
      setSelectedAnswerIndex(answerIndex);
      onAnswerSelect(question.id, answerIndex);
    }
  };

  // Fonction pour déterminer la classe CSS d'un bouton de réponse selon son état
  const getButtonClass = (index) => {
    // Si c'est la réponse sélectionnée
    if (selectedAnswerIndex === index || answer?.selectedAnswer === index) {
      if (hasAnswered) {
        // Si question répondue : vert pour bonne réponse, rouge pour mauvaise
        if (index === question.correctAnswerIndex) {
          return "btn-success";
        } else {
          return "btn-error";
        }
      } else {
        // Si en cours de sélection : bleu primaire
        return "btn-primary";
      }
    }
    
    // Affichage de la bonne réponse une fois la question répondue
    if (hasAnswered && index === question.correctAnswerIndex) {
      return "btn-success";
    }
    
    // État par défaut
    return "";
  };

  // Préparation des boutons pour le composant JoinButtons
  const answerButtons = question.answers.map((answerText, index) => ({
    content: answerText,
    answerIndex: index,
    className: `${getButtonClass(index)} ${hasAnswered ? "opacity-75" : ""}`,
    onClick: () => handleAnswerClick(index),
    disabled: hasAnswered // Désactive les boutons une fois la question répondue
  }));

  // Fonction pour déterminer l'icône à afficher dans la timeline selon l'état de la question
  const getIconSrc = () => {
    if (hasAnswered) {
      // Si question répondue : icône de validation ou d'erreur selon la justesse
      const isCorrect = selectedAnswerIndex === question.correctAnswerIndex || 
                        answer?.selectedAnswer === question.correctAnswerIndex;
      return isCorrect ? validatedSvg : unvalidatedSvg;
    }
    
    // Si réponse sélectionnée mais pas encore validée ou état par défaut
    if (selectedAnswerIndex !== null) {
      return apertureSvg;
    }
    
    return apertureSvg;
  };

  // Composant réutilisable pour afficher une icône SVG avec des propriétés configurables
  const IconComponent = ({ src, alt, className = "h-5 w-5" }) => (
    <img src={src} alt={alt} className={className} />
  );

  return (
    <li 
      ref={itemRef}
      data-question-id={question.id} 
      className="question-item" 
      style={{
        // Styles initiaux pour l'animation d'apparition
        opacity: 0,
        transform: 'translateY(20px)',
        transition: 'opacity 0.5s, transform 0.5s'
      }}
    >
      {count > 0 && <hr className="bg-primary" />}
      
      {isLeft ? (
        <>
          <div className={`${posClass} timeline-box question-box`}>
            <h2 className="mb-3 font-bold">{question.question}</h2>
            <div className="flex flex-col items-center w-full gap-2" data-question-id={question.id}>
              <JoinButtons buttons={answerButtons} className="join-vertical w-full" />
            </div>
          </div>
          <div className="timeline-middle question-circle">
            <IconComponent src={getIconSrc()} alt="Question status" />
          </div>
        </>
      ) : (
        <>
          <div className="timeline-middle question-circle">
            <IconComponent src={getIconSrc()} alt="Question status" />
          </div>
          <div className={`${posClass} timeline-box question-box`}>
            <h2 className="mb-3 font-bold">{question.question}</h2>
            <div className="flex flex-col items-center w-full gap-2" data-question-id={question.id}>
              <JoinButtons buttons={answerButtons} className="join-vertical w-full" />
            </div>
          </div>
        </>
      )}
      
      <hr className="bg-primary" />
    </li>
  );
};

export default QuestionItem;