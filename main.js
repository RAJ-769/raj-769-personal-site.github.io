// 1. Config & Age
const updateAge = () => {
  const diff = new Date(new Date() - new Date('2001-10-31'));
  const el = document.querySelector('.age');
  if (el) el.textContent = Math.abs(diff.getUTCFullYear() - 1970);
};
updateAge();
setInterval(updateAge, 86400000);

// 2. Links & Avatar
const links = ["https://x.com/im_RAJ769", "https://www.linkedin.com/in/raj769", "https://github.com/RAJ-769", "https://www.chess.com/member/raj769"];
document.querySelectorAll(".social-row a").forEach((a, i) => links[i] && Object.assign(a, { href: links[i], target: '_blank', rel: 'noopener' }));

const img = document.querySelector('.avatar-img');
if(img) {
  img.onload = () => img.parentElement.classList.remove('fallback');
  img.onerror = () => img.parentElement.classList.add('fallback');
  if(img.complete) img.onload();
}

// 3. Splash & Transition
const splash = document.getElementById('introSplash');
const fadeOut = () => { 
  splash.classList.add('hidden'); 
  setTimeout(() => splash.remove(), 1000); 
  initType(); 
};

if (splash) {
  setTimeout(fadeOut, 2200);
  splash.onclick = fadeOut;
  window.onkeydown = e => ["Escape", "Enter", " "].includes(e.key) && fadeOut();
} else {
  setTimeout(initType, 100);
}

// 4. UNIFIED LIGHT & INTERACTION SYSTEM
const gl = document.querySelectorAll('.card, .social-btn, .nav-btn');
let activeEl = null; 

// A: Desktop Mouse Logic
if (window.matchMedia("(hover: hover)").matches) {
  let frame;
  document.onmousemove = e => {
    if (frame) cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const { clientX, clientY } = e;
      gl.forEach(el => {
        const rect = el.getBoundingClientRect();
        el.style.setProperty('--x', `${clientX - rect.left}px`);
        el.style.setProperty('--y', `${clientY - rect.top}px`);
      });
    });
  };
} 

// B: Mobile Touch Logic
else {
  let touchFrame;
  const handleTouch = (e) => {
    if (touchFrame) cancelAnimationFrame(touchFrame);
    touchFrame = requestAnimationFrame(() => {
      const touch = e.touches[0];
      const target = document.elementFromPoint(touch.clientX, touch.clientY);
      const el = target ? target.closest('.card, .social-btn, .nav-btn') : null;

      if (activeEl && activeEl !== el) {
        activeEl.classList.remove('glass-active');
      }
      
      if (el) {
        const rect = el.getBoundingClientRect();
        el.style.setProperty('--x', `${touch.clientX - rect.left}px`);
        el.style.setProperty('--y', `${touch.clientY - rect.top}px`);
        el.classList.add('glass-active');
        activeEl = el;
      } else {
        activeEl = null;
      }
    });
  };
  window.addEventListener('touchstart', handleTouch, { passive: true });
  window.addEventListener('touchmove', handleTouch, { passive: true });
  window.addEventListener('touchend', () => {
    if (activeEl) {
      activeEl.classList.remove('glass-active');
      activeEl = null;
    }
  });
}

// 5. Generative Bio
function initType() {
  const bio = document.querySelector('.bio');
  if (!bio || bio.dataset.typed) return;
  
  const text = bio.textContent.trim();
  bio.textContent = ''; 
  bio.dataset.typed = "true"; 
  
  const cursor = document.createElement('span');
  cursor.className = 'bio-cursor';
  bio.appendChild(cursor);

  (async () => {
    for (const char of text) {
      bio.insertBefore(document.createTextNode(char), cursor);
      await new Promise(r => setTimeout(r, /[.,!?;]/.test(char) ? 50 : 20));
    }
    cursor.remove();
  })();
}

// 6. Page Transition
const nextBtn = document.querySelector('.next-page-btn');
if (nextBtn) {
  nextBtn.onclick = (e) => {
    e.preventDefault();
    document.body.classList.add('fade-out');
    setTimeout(() => window.location.assign(nextBtn.href), 600);
  };
}

// 7. Dropdown Logic
const btn = document.querySelector('.contact-trigger');
const menu = document.querySelector('.nav-menu-wrap');
if (btn && menu) {
  btn.onclick = (e) => { e.stopPropagation(); menu.classList.toggle('open'); };
  window.onclick = () => menu.classList.remove('open');
  menu.onclick = (e) => e.stopPropagation();
}