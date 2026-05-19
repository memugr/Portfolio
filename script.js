'use strict';

// ── MODALS ──
// Z-index dinàmic (el modal clicat sempre al davant)
let zTop = 500;

function bringToFront(modal) {
    zTop++;
    modal.style.zIndex = zTop;
}

// Obrir modal 
function openModal(id) {
    const overlay = document.getElementById(id);
    overlay.classList.add('open');
    bringToFront(overlay);
    if (window.innerWidth < 768) {
        document.body.style.overflow = 'hidden';
    }
}

// Tancar modal
function closeModal(id) {
    document.getElementById(id).classList.remove('open');
    const anyOpen = document.querySelectorAll('.modal-overlay.open').length > 0;
    if (!anyOpen) document.body.style.overflow = '';
}

// Arrossegar
function makeDraggable(dragHandle, modalOverlay) {
    let isDragging = false, startX, startY, origX, origY;
    const win = modalOverlay.querySelector('.modal');

    dragHandle.addEventListener('mousedown', e => {
        if (window.innerWidth < 768) return;
        bringToFront(modalOverlay);
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        const rect = win.getBoundingClientRect();
        origX = rect.left;
        origY = rect.top;
        win.style.transform = 'none';
        win.style.left = origX + 'px';
        win.style.top  = origY + 'px';
        e.preventDefault();
    });

    document.addEventListener('mousemove', e => {
        if (!isDragging) return;
        win.style.left = (origX + e.clientX - startX) + 'px';
        win.style.top  = (origY + e.clientY - startY) + 'px';
    });

    document.addEventListener('mouseup', () => { isDragging = false; });
    // clicar el modal el porta al davant
    modalOverlay.addEventListener('mousedown', () => bringToFront(modalOverlay));
}

// Inicialitza cada modal 
document.querySelectorAll('.modal-overlay').forEach(overlay => {
    const handle = overlay.querySelector('.modal-titlebar');
    makeDraggable(handle, overlay);
});

// ── Cat ──
const catWrap = document.querySelector('.cat-container');
const cat = document.querySelector('.cat-svg');

catWrap.addEventListener('click', () => {
    cat.style.animation = 'none';
    void cat.offsetWidth;
    cat.style.animation = 'cat-boop 0.4s ease-in-out';
});

cat.addEventListener('animationend', () => {
    if (cat.style.animation.includes('cat-boop')) {
        cat.style.animation = 'cat-idle 3s ease-in-out infinite';
    }
});
