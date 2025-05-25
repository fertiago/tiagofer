import anime from 'animejs/lib/anime.es.js';

export const animateButton = (buttonElement) => {
    anime({
        targets: buttonElement,
        scale: [0.9, 1],
        opacity: [0.5, 1],
        duration: 400,
        easing: 'easeOutElastic(1, .5)',
    });
};

export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return emailRegex.test(email);
};
