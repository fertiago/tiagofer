import React from 'react';
import QuestionItem from './quiz/QuestionItem';

/**
 * Composant Timeline - Affiche une liste chronologique de questions 
 * avec une logique d'affichage progressif basée sur les réponses de l'utilisateur
 */
const Timeline = ({ questions, onAnswerSelect, answeredQuestions }) => {
  // Logique de filtrage des questions
  const questionsToShow = questions.filter((question, index) => {
    // Cas 1: Première question - toujours visible pour permettre le démarrage du quiz
    if (index === 0) return true;
    
    // Cas 2: Questions suivantes - visibles uniquement si la question précédente est répondue
    const previousQuestion = questions[index - 1];
    return answeredQuestions?.[previousQuestion.id] !== undefined;
  });

  // Rendu de la timeline avec les questions filtrées
  return (
    <ul className="timeline timeline-vertical">
      {questionsToShow.map((question, index) => (
        <QuestionItem 
          key={question.id} 
          question={question} 
          count={index} 
          onAnswerSelect={onAnswerSelect}
          isAnswered={answeredQuestions?.[question.id] !== undefined}
        />
      ))}
    </ul>
  );
};

export default Timeline;
