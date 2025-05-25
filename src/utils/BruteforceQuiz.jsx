// Bruteforce intelligent avec verrouillage progressif des bonnes réponses
export const executeBruteforce = async (questions, logger, onComplete) => {
  // Initialisation des structures de suivi des réponses et du score
  const newAnsweredQuestions = {};
  let correctCount = 0;
  const currentAnswers = questions.map(() => 0); // Indices de réponses courants
  const lockedQuestions = questions.map(() => false); // Suivi des questions verrouillées
  const correctAnswerIndices = questions.map(q => q.correctAnswerIndex); // Indices des bonnes réponses

  // Log de démarrage
  if (logger) logger(`Début du bruteforce intelligent: recherche des meilleures réponses`, "start");
  await new Promise(resolve => setTimeout(resolve, 500));

  // Variables de suivi des combinaisons et du meilleur score
  let combinationCounter = 0;
  let bestCorrectCount = 0;

  // Boucle principale : teste des combinaisons jusqu'à tout verrouiller
  while (lockedQuestions.some(locked => !locked) && combinationCounter < 1000) {
    // Affichage de la combinaison actuelle
    const combinationString = currentAnswers.map((ans, idx) => `Q${idx+1}:R${ans+1}`).join(', ');
    if (logger) logger(`Test de la combinaison: ${combinationString}`, "testing");

    // Évalue chaque question de la combinaison actuelle
    let currentCorrectCount = 0;
    let questionsResults = [];
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      const answerIndex = currentAnswers[i];
      const isCorrectAnswer = answerIndex === correctAnswerIndices[i];
      if (isCorrectAnswer) {
        currentCorrectCount++;
      }
      // Préparation du log pour chaque question
      if (answerIndex < question.answers.length) {
        const answer = question.answers[answerIndex];
        const logMessage = `Question ${question.id}: Option ${answerIndex + 1} - "${answer.substring(0, 30)}${answer.length > 30 ? '...' : ''}" - ${isCorrectAnswer ? 'CORRECT ✓' : 'INCORRECT ✗'}`;
        questionsResults.push({
          questionIndex: i,
          isCorrect: isCorrectAnswer,
          logMessage
        });
      }
    }
    // Log des résultats de chaque question
    for (const result of questionsResults) {
      if (logger) logger(result.logMessage, result.isCorrect ? "success" : "info");
    }
    await new Promise(resolve => setTimeout(resolve, 300));

    // Verrouille les questions dont la réponse correcte vient d'être trouvée
    if (currentCorrectCount > bestCorrectCount) {
      if (logger) logger(`🔍 Amélioration du score! ${bestCorrectCount} → ${currentCorrectCount} bonnes réponses`, "improvement");
      for (let i = 0; i < questions.length; i++) {
        const isCorrect = currentAnswers[i] === correctAnswerIndices[i];
        if (isCorrect && !lockedQuestions[i]) {
          lockedQuestions[i] = true;
          if (logger) logger(`🔒 Question ${questions[i].id} verrouillée: Option ${currentAnswers[i] + 1} est correcte`, "locked");
        }
      }
      bestCorrectCount = currentCorrectCount;
    }

    // Arrêt si toutes les questions sont verrouillées
    if (lockedQuestions.every(locked => locked)) {
      if (logger) logger(`✅ TOUTES LES BONNES RÉPONSES TROUVÉES: ${currentAnswers.map((ans, idx) => `Q${idx+1}:R${ans+1}`).join(', ')}`, "success");
      break;
    }

    // Passe à la combinaison suivante (ignore les questions verrouillées)
    let index = questions.length - 1;
    let changed = false;
    while (index >= 0 && !changed) {
      if (!lockedQuestions[index]) {
        currentAnswers[index]++;
        if (currentAnswers[index] >= questions[index].answers.length) {
          currentAnswers[index] = 0;
          index--;
        } else {
          changed = true;
        }
      } else {
        index--;
      }
    }
    // Si plus de combinaison possible, sortir
    if (!changed) {
      if (logger) logger(`🔄 Toutes les combinaisons possibles testées pour les questions non verrouillées`, "info");
      break;
    }
    combinationCounter++;
    await new Promise(resolve => setTimeout(resolve, 200));
  }

  // Construit l'objet final avec toutes les bonnes réponses
  correctCount = bestCorrectCount;
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    if (lockedQuestions[i]) {
      newAnsweredQuestions[q.id] = {
        selectedAnswer: currentAnswers[i],
        isCorrect: true
      };
    } else {
      newAnsweredQuestions[q.id] = {
        selectedAnswer: q.correctAnswerIndex,
        isCorrect: true
      };
      correctCount++;
      if (logger) logger(`⚠️ Question ${q.id} non résolue, utilisation de la réponse correcte: Option ${q.correctAnswerIndex + 1}`, "warning");
    }
  }

  // Log de fin et callback
  if (logger) logger(`------ Bruteforce intelligent terminé! ${correctCount}/${questions.length} bonnes réponses trouvées. ------`, "complete");
  if (onComplete) {
    onComplete(newAnsweredQuestions, correctCount);
  }
  return {
    answeredQuestions: newAnsweredQuestions,
    correctCount
  };
};

export default {
  executeBruteforce
};
