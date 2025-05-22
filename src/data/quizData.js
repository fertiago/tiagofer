export const quizQuestions = [
    {
        id: 1,
        question: 'Question 1',
        answers: ['Réponse 1', 'Réponse 2', 'Réponse 3', 'Réponse 4'],
        correctAnswerIndex: Math.floor(Math.random() * 4),
    },
    {
        id: 2,
        question: 'Question 2',
        answers: ['Réponse 1', 'Réponse 2', 'Réponse 3'],
        correctAnswerIndex: Math.floor(Math.random() * 3),
    },
    {
        id: 3,
        question: 'Question 3',
        answers: ['Réponse 1', 'Réponse 2', 'Réponse 3', 'Réponse 4'],
        correctAnswerIndex: Math.floor(Math.random() * 4),
    },
    {
        id: 4,
        question: 'Question 4',
        answers: ['Réponse 1', 'Réponse 2', 'Réponse 3'],
        correctAnswerIndex: Math.floor(Math.random() * 3),
    },
    {
        id: 5,
        question: 'Question 5',
        answers: ['Réponse 1', 'Réponse 2', 'Réponse 3', 'Réponse 4'],
        correctAnswerIndex: Math.floor(Math.random() * 4),
    },
    {
        id: 6,
        question: 'Question 6',
        answers: ['Réponse 1', 'Réponse 2', 'Réponse 3'],
        correctAnswerIndex: Math.floor(Math.random() * 3),
    },
    {
        id: 7,
        question: 'Question 7',
        answers: ['Réponse 1', 'Réponse 2', 'Réponse 3', 'Réponse 4'],
        correctAnswerIndex: Math.floor(Math.random() * 4),
    },
];

// Fonction utilitaire pour obtenir des questions aléatoires
export const getRandomQuestions = (count = 5) => {
    const shuffled = [...quizQuestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, quizQuestions.length));
};

// Fonction pour vérifier si une réponse est correcte
export const checkAnswer = (questionId, selectedAnswerIndex) => {
    const question = quizQuestions.find(q => q.id === questionId);
    return question && selectedAnswerIndex === question.correctAnswerIndex;
};
