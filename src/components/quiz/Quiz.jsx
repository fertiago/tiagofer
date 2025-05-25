import React, { useState, useEffect } from 'react';
import QuizButton from './QuizButton';
import QuizModal from './QuizModal';
import { quizQuestions, checkAnswer } from '../../data/quizData';
import { executeBruteforce } from '../../utils/BruteforceQuiz';

const Quiz = ({ customQuestions = null }) => {
  // États pour gérer l'ouverture/fermeture de la modal du quiz
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // État pour stocker toutes les réponses données par l'utilisateur
  // Structure : { questionId: { selectedAnswer: index, isCorrect: boolean } }
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [progress, setProgress] = useState(0);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Utilise les questions personnalisées si fournies, sinon les questions par défaut
    setQuestions(customQuestions || quizQuestions);
  }, [customQuestions]);

  // Fonctions pour gérer l'ouverture et la fermeture de la modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAnswerSelect = (questionId, answerIndex) => {
    const question = questions.find(q => q.id === questionId);
    // Vérifie que la question existe et qu'elle n'a pas déjà été répondue
    if (!question || answeredQuestions[questionId] !== undefined) return;

    const isCorrect = answerIndex === question.correctAnswerIndex;
    
    // Mise à jour de l'état avec la nouvelle réponse
    const newAnsweredQuestions = {
      ...answeredQuestions,
      [questionId]: {
        selectedAnswer: answerIndex,
        isCorrect
      }
    };
    
    setAnsweredQuestions(newAnsweredQuestions);
    
    // Mise à jour des statistiques
    const correctCount = Object.values(newAnsweredQuestions).filter(a => a.isCorrect).length;
    setCorrectAnswers(correctCount);
    
    const progressPercentage = Math.round((Object.keys(newAnsweredQuestions).length / questions.length) * 100);
    setProgress(progressPercentage);
  };

  // Fonction pour redémarrer le quiz en réinitialisant tous les états
  const handleRestartQuiz = () => {
    setAnsweredQuestions({});
    setCorrectAnswers(0);
    setProgress(0);
  };

  const handleBrutforceQuiz = (logger) => {
    // Utilise notre nouvelle fonction de bruteforce depuis l'utilitaire
    executeBruteforce(
      questions, 
      logger, 
      (newAnsweredQuestions, correctCount) => {
        // Callback appelé lorsque le bruteforce est terminé
        setAnsweredQuestions(newAnsweredQuestions);
        setCorrectAnswers(correctCount);
        setProgress(100);
      }
    );
  };

  return (
    <>
      <QuizButton onClick={openModal} />
      <QuizModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        questions={questions}
        correctAnswers={correctAnswers}
        progress={progress}
        onRestartQuiz={handleRestartQuiz}
        onBrutforceQuiz={handleBrutforceQuiz}
        onAnswerSelect={handleAnswerSelect}
        answeredQuestions={answeredQuestions}
      />
    </>
  );
};

export default Quiz;
