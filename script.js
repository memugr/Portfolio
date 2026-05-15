'use strict';

// Cat
const catWrap = document.querySelector('.cat-container');
const cat = document.querySelector('.cat-svg');

catWrap.addEventListener('click', () => {
    cat.style.animation = 'none';
    void cat.offsetWidth;
    cat.style.animation = 'cat-boop 0.4s ease-in-out';
});

cat.addEventListener('animationend', () => {
    // Only reset if boop just finished (not idle)
    if (cat.style.animation.includes('cat-boop')) {
        cat.style.animation = 'cat-idle 3s ease-in-out infinite';
    }
});
