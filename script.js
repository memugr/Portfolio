'use strict';

// MODAL
function openModal() {
    document.getElementById('modal-readme').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('modal-readme').classList.remove('open');
    document.body.style.overflow = '';
}

// Tecla Escape
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
});

// ── Arrossegar (només escriptori) ──
const drag = document.getElementById('modal-drag');
const win  = document.getElementById('modal-window');

let isDragging = false, startX, startY, origX, origY;

drag.addEventListener('mousedown', e => {
    if (window.innerWidth < 768) return;
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    const rect = win.getBoundingClientRect();
    origX = rect.left;
    origY = rect.top;
    win.style.transform = 'none';
    win.style.left = origX + 'px';
    win.style.top  = origY + 'px';
});

document.addEventListener('mousemove', e => {
    if (!isDragging) return;
    win.style.left = (origX + e.clientX - startX) + 'px';
    win.style.top  = (origY + e.clientY - startY) + 'px';
});

document.addEventListener('mouseup', () => { isDragging = false; });

// CAT
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
