// Theme toggle (light ↔ dark)
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const next = current === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
}

// i18n
let currentLang = localStorage.getItem('lang') || 'es';
let translations = {};

async function loadLang(lang) {
  try {
    const base = window.location.pathname.includes('/projects/') ? '../' : '';
    const res = await fetch(`${base}lang/${lang}.json`);
    translations = await res.json();
    currentLang = lang;
    localStorage.setItem('lang', lang);
    applyTranslation();
    document.documentElement.lang = lang;
    const toggle = document.getElementById('langToggle');
    if (toggle) toggle.textContent = lang === 'es' ? 'EN' : 'ES';
  } catch (e) {
    console.warn('Failed to load language:', lang);
  }
}

function applyTranslation() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const text = key.split('.').reduce((o, k) => o && o[k], translations);
    if (text) el.textContent = text;
  });
  document.querySelectorAll('[data-i18n-attr]').forEach(el => {
    const parts = el.dataset.i18nAttr.split(':');
    if (parts.length === 2) {
      const [attr, key] = parts;
      const text = key.split('.').reduce((o, k) => o && o[k], translations);
      if (text) el.setAttribute(attr, text);
    }
  });
}

function setupLangToggle() {
  const btn = document.getElementById('langToggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    loadLang(currentLang === 'es' ? 'en' : 'es');
  });
}

// Apply saved theme on load + init all features
document.addEventListener('DOMContentLoaded', function() {
  const saved = localStorage.getItem('theme');
  if (saved && ['light', 'dark'].includes(saved)) {
    document.documentElement.setAttribute('data-theme', saved);
  }
  revealOnScroll();
  setupHamburger();
  setupBackToTop();
  setupLightbox();
  setupFilter();
  animateStats();
  setupPageTransitions();
  setupContactForm();
  setupLangToggle();
  loadLang(currentLang);
});

// Hamburger
function setupHamburger() {
  const h = document.getElementById('hamburger');
  const n = document.getElementById('navLinks');
  if (!h || !n) return;
  const close = () => { n.classList.remove('open'); h.textContent = '☰'; };
  h.addEventListener('click', () => {
    n.classList.toggle('open');
    h.textContent = n.classList.contains('open') ? '✕' : '☰';
  });
  document.addEventListener('click', e => {
    if (n.classList.contains('open') && !n.contains(e.target) && e.target !== h) close();
  });
  n.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
}

// Scroll reveal with stagger
function revealOnScroll() {
  const els = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const idx = Array.from(entry.target.parentNode.children).indexOf(entry.target);
        entry.target.style.transitionDelay = `${idx * 0.08}s`;
        const delayed = entry.target.querySelector('.terminal-cursor-delayed');
        if (delayed) {
          delayed.style.animationDelay = `${idx * 0.6}s`;
          delayed.style.animationPlayState = 'running';
        }
        entry.target.classList.add('active');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => obs.observe(el));
}

// Back to top
function setupBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// Lightbox
function setupLightbox() {
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightboxImg');
  if (!lb || !lbImg) return;
  document.querySelectorAll('.project-image').forEach(img => {
    img.addEventListener('click', () => {
      lbImg.src = img.src;
      lb.classList.add('open');
    });
  });
  lb.addEventListener('click', () => lb.classList.remove('open'));
}

// Project filter
function setupFilter() {
  const btns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');
  if (!btns.length || !cards.length) return;
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      cards.forEach(card => {
        card.classList.remove('appear');
        if (card.classList.contains('hidden')) {
          card.classList.remove('fade-out');
        } else {
          card.classList.add('fade-out');
        }
      });
      setTimeout(() => {
        cards.forEach(card => {
          const match = filter === 'all' || (card.dataset.tags || '').toLowerCase().includes(filter);
          card.classList.remove('fade-out');
          if (match) {
            card.classList.remove('hidden');
            card.classList.add('appear');
          } else {
            card.classList.add('hidden');
          }
        });
      }, 500);
    });
  });
}

// Animated stats
function animateStats() {
  const nums = document.querySelectorAll('.stat-number');
  if (!nums.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        if (isNaN(target)) return;
        const duration = 1200;
        const start = performance.now();
        const step = now => {
          const t = Math.min((now - start) / duration, 1);
          el.textContent = Math.floor(t * target);
          if (t < 1) requestAnimationFrame(step);
          else el.textContent = target;
        };
        requestAnimationFrame(step);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  nums.forEach(el => obs.observe(el));
}

// Page transitions on internal links
function setupPageTransitions() {
  document.querySelectorAll('a[href]').forEach(a => {
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel')) return;
    a.addEventListener('click', e => {
      e.preventDefault();
      document.body.classList.add('fade-out');
      setTimeout(() => { window.location.href = href; }, 250);
    });
  });
  window.addEventListener('pageshow', () => document.body.classList.remove('fade-out'));
}

// Hero particles
(function initParticles() {
  const canvas = document.getElementById('particlesCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, particles = [];
  const COUNT = 60;
  function resize() {
    const parent = canvas.parentElement;
    w = canvas.width = parent.offsetWidth;
    h = canvas.height = parent.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);
  for (let i = 0; i < COUNT; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 2 + 1,
      a: Math.random() * 0.4 + 0.1
    });
  }
  function draw() {
    ctx.clearRect(0, 0, w, h);
    const theme = document.documentElement.getAttribute('data-theme');
    const color = theme === 'dark' ? '88,166,255' : '74,108,247';
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color},${p.a})`;
      ctx.fill();
    });
    // draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${color},${0.08 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

// Contact form AJAX
function setupContactForm() {
  const form = document.querySelector('.contact-form-card form');
  if (!form) return;
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('.submit-btn');
    const orig = btn.textContent;
    const sending = translations.form?.sending || 'Enviando...';
    btn.textContent = sending;
    btn.disabled = true;
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        const successMsg = translations.form?.success || 'Mensaje enviado. Gracias!';
        form.innerHTML = `<p class="success-msg">${successMsg}</p>`;
      } else {
        throw new Error();
      }
    } catch {
      btn.textContent = orig;
      btn.disabled = false;
      const errorMsg = translations.form?.error || 'Error al enviar. Intenta de nuevo.';
      alert(errorMsg);
    }
  });
}
