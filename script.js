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
        win.style.top = origY + 'px';
        e.preventDefault();
    });

    document.addEventListener('mousemove', e => {
        if (!isDragging) return;
        win.style.left = (origX + e.clientX - startX) + 'px';
        win.style.top = (origY + e.clientY - startY) + 'px';
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
const bubble = document.getElementById('message-cat');

let catMessagesDesktop = [];
let catMessagesMobile  = [];

fetch('data/cat-messages.json')
    .then(res => res.json())
    .then(data => {
        catMessagesDesktop = data.desktop;
        catMessagesMobile  = data.mobile;
    })
    .catch(err => {
        console.error('Error carregant missatges:', err);
        catMessagesDesktop = ["Meow!"];
        catMessagesMobile  = ["Meow!"];
        openModal('modal-error');
    });

function getMessages() {
    return window.innerWidth < 480 ? catMessagesMobile : catMessagesDesktop;
}

let msgTimeout = null;
let clickCount = 0;
let clickReset = null;

catWrap.addEventListener('click', () => {
    if (!document.getElementById('modal-error').classList.contains('open')) {
        clickCount++;
        clearTimeout(clickReset);
        clickReset = setTimeout(() => { clickCount = 0; }, 3000);

        if (clickCount >= 5) {
            clickCount = 0;
            openModal('modal-error');
        } else {
            cat.style.animation = 'none';
            void cat.offsetWidth;
            cat.style.animation = 'cat-boop 0.4s ease-in-out';

            const messages = getMessages();
            const msg = messages[Math.floor(Math.random() * messages.length)];
            bubble.textContent = msg;
            bubble.style.setProperty('--msg-width', msg.length + 'ch');
            bubble.style.setProperty('--msg-steps', msg.length);
            bubble.classList.remove('visible');
            void bubble.offsetWidth;
            bubble.classList.add('visible');

            clearTimeout(msgTimeout);
            msgTimeout = setTimeout(() => { bubble.classList.remove('visible'); }, 2000);
        }
    }
});

cat.addEventListener('animationend', () => {
    if (cat.style.animation.includes('cat-boop')) {
        cat.style.animation = 'cat-idle 3s ease-in-out infinite';
    }
});
