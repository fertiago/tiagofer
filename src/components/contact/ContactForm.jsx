import React, { useState, useEffect, useRef } from 'react';
import ProgressBar from './ProgressBar';
import ChatContent from './ChatContent';
import InputSection from './InputSection';
import { quizQuestions } from '../../data/contactQuestions';
import { animateButton, isValidEmail } from '../../utils/contactUtils';

const ContactForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [messages, setMessages] = useState([]);
  const [answers, setAnswers] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [inputVisible, setInputVisible] = useState(true);
  const [initialized, setInitialized] = useState(false);
  const sendButtonRef = useRef(null);

  // Test si le formulaire a déjà été initialisé
  useEffect(() => {
    if (!initialized) {
      const firstQuestion = quizQuestions[0].displayText;
      setMessages([{
        id: Date.now(),
        text: firstQuestion,
        isUser: false
      }]);
      
      setInitialized(true);
    }
    
    // Anime le bouton d'envoi
    if (sendButtonRef.current) {
      animateButton(sendButtonRef.current);
    }
  }, [initialized]);

  const updateProgressBar = () => {
    return `contact-${quizQuestions[currentStep]?.question.toLowerCase() || 'name'}`;
  };

  const addMessage = (message, isUser = false) => {
    setMessages(prevMessages => [...prevMessages, {
      id: Date.now(),
      text: message,
      isUser
    }]);
  };

  const showEmailError = () => {
    addMessage('Veuillez entrer une adresse email valide.');
    return false;
  };

  const showNextQuestion = (stepIndex) => {
    const nextQuestion = quizQuestions[stepIndex];
    if (!nextQuestion) return;
    
    let questionText = nextQuestion.displayText;

    if (nextQuestion.question.toLowerCase() === 'email' && answers.name) {
      questionText = `Enchanté, ${answers.name} ! ${nextQuestion.displayText}`;
    } else if (nextQuestion.question.toLowerCase() === 'message' && answers.name) {
      questionText = `Merci ${answers.name}. ${nextQuestion.displayText}`;
    }

    addMessage(questionText);
  };

  const showSummary = () => {
    const summary = `Récapitulatif de vos informations,<br>
      Nom: ${answers.name}<br>
      Email: ${answers.email}<br>
      Message: ${answers.message}`;
    
    addMessage(summary);
    setInputVisible(false);
  };

  // Fonction pour gérer l'animation du bouton d'envoi
  const handleInput = (userInput) => {
    if (!userInput.trim()) return;

    const currentQuestion = quizQuestions[currentStep];
    
    // Validation de l'email
    if (currentQuestion.question.toLowerCase() === 'email' && !isValidEmail(userInput)) {
      addMessage(userInput, true); // Affiche la réponse de l'utilisateur même si invalide
      return showEmailError();
    }

    // Affiche la réponse de l'utilisateur après validation réussie
    addMessage(userInput, true);
    
    // Sauvegarde de la réponse
    const updatedAnswers = { ...answers };
    switch (currentQuestion.question.toLowerCase()) {
      case 'name':
        updatedAnswers.name = userInput;
        break;
      case 'email':
        updatedAnswers.email = userInput;
        break;
      case 'message':
        updatedAnswers.message = userInput;
        break;
    }
    setAnswers(updatedAnswers);

    // Passage à l'étape suivante
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);

    if (nextStep < quizQuestions.length) {
      const delay = Math.random() * (500 - 250) + 250;
      setTimeout(() => {
        showNextQuestion(nextStep);
      }, delay);
    } else {
      const delay = Math.random() * (500 - 250) + 250;
      setTimeout(() => {
        showSummary();
      }, delay);
    }

    return true;
  };

  const submitForm = () => {
    addMessage('Envoi en cours...');

    setTimeout(() => {
      addMessage('Formulaire envoyé! Merci pour votre message. Nous vous répondrons dès que possible.');
      
      // Réinitialise le formulaire pour un nouveau message
      setTimeout(() => {
        resetForm();
      }, 2000);
    }, 1500);
  };

  const resetForm = () => {
    setMessages([]);
    setCurrentStep(0);
    setAnswers({
      name: '',
      email: '',
      message: '',
    });
    setInputVisible(true);
    setInitialized(false);
  };

  return (
    <>
      <ProgressBar currentStepId={updateProgressBar()} />
      
      <ChatContent messages={messages} />
      
      <InputSection 
        ref={sendButtonRef}
        onSubmit={handleInput} 
        onSubmitForm={submitForm}
        inputVisible={inputVisible}
        isSubmitMode={currentStep >= quizQuestions.length - 1}
        onReset={resetForm}
      />
    </>
  );
};

export default ContactForm;
