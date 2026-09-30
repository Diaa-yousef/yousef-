/**
 * Youssef Diaa Abdallah — Cybersecurity & Software Testing Portfolio Engine
 * Cyber Matrix Background, 4 Cursor Models Switcher, & 3D Card Tilt Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // Set Default Cursor Model (Model 1: Scope)
  document.body.classList.add('cursor-model-1');

  // --- CURSOR MODEL SWITCHER CONTROLLER ---
  const cursorBtns = document.querySelectorAll('.cursor-btn');
  cursorBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const model = btn.getAttribute('data-cursor');
      document.body.classList.remove('cursor-model-1', 'cursor-model-2', 'cursor-model-3', 'cursor-model-4');
      document.body.classList.add(`cursor-model-${model}`);

      cursorBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // --- 1. CYBERSECURITY MATRIX & THREAT SCANNER BACKGROUND CANVAS ---
  const canvas = document.getElementById('bg-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initCyberElements();
    });

    let mouse = { x: width / 2, y: height / 2 };
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    const cyberTokens = [
      '0101', '0x7F', 'QA_PASS', 'SEC_OK', 'PORT_443', 'DEPI_QA', 
      'TEST_200', 'RSA_2048', 'ETHICAL_HACK', 'BUG_FREE', 'OSI_L7',
      'C++', 'PY_FRAMEWORK', 'NO_VULN', '0x9F', 'TCP_SYN', 'ENCRYPTED'
    ];

    class CyberStream {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vy = Math.random() * 1.5 + 0.8;
        this.text = cyberTokens[Math.floor(Math.random() * cyberTokens.length)];
        this.fontSize = Math.floor(Math.random() * 4) + 11;
        this.alpha = Math.random() * 0.45 + 0.2;
        this.color = Math.random() > 0.3 ? '#00f2fe' : '#10b981';
      }

      update() {
        this.y += this.vy;
        if (this.y > height + 30) {
          this.y = -20;
          this.x = Math.random() * width;
          this.text = cyberTokens[Math.floor(Math.random() * cyberTokens.length)];
        }
      }

      draw() {
        ctx.font = `${this.fontSize}px 'Courier New', monospace`;
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.color;
        ctx.fillText(this.text, this.x, this.y);
        ctx.globalAlpha = 1.0;
        ctx.shadowBlur = 0;
      }
    }

    let streams = [];
    let radarAngle = 0;

    function initCyberElements() {
      streams = [];
      const streamCount = Math.min(Math.floor(width / 22), 65);
      for (let i = 0; i < streamCount; i++) {
        streams.push(new CyberStream());
      }
    }
    initCyberElements();

    function animateCyberBackground() {
      ctx.clearRect(0, 0, width, height);

      // Draw Cyber Grid Lines
      ctx.strokeStyle = 'rgba(0, 242, 254, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 60;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw Rotating Security Radar Scanner Sweep
      radarAngle += 0.008;
      const centerX = width * 0.85;
      const centerY = height * 0.35;
      const radarRadius = 220;

      ctx.beginPath();
      ctx.arc(centerX, centerY, radarRadius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 242, 254, 0.08)';
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radarRadius, radarAngle, radarAngle + 0.4);
      ctx.closePath();
      ctx.fillStyle = 'rgba(0, 242, 254, 0.05)';
      ctx.fill();

      // Render Floating Cyber Data Streams
      for (let i = 0; i < streams.length; i++) {
        streams[i].update();
        streams[i].draw();
      }

      // Draw EMP Glow under mouse cursor
      if (mouse.x && mouse.y) {
        let grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 160);
        grad.addColorStop(0, 'rgba(0, 242, 254, 0.08)');
        grad.addColorStop(0.5, 'rgba(121, 40, 202, 0.04)');
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 160, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(animateCyberBackground);
    }
    animateCyberBackground();
  }

  // --- 2. HACKER TARGET RETICLE CURSOR ENGINE ---
  const cursorDot = document.getElementById('cursor-dot');
  const cursorOutline = document.getElementById('cursor-outline');

  if (cursorDot && cursorOutline && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let outlineX = mouseX;
    let outlineY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    const animateCursor = () => {
      outlineX += (mouseX - outlineX) * 0.22;
      outlineY += (mouseY - outlineY) * 0.22;

      cursorOutline.style.left = `${outlineX}px`;
      cursorOutline.style.top = `${outlineY}px`;

      requestAnimationFrame(animateCursor);
    };
    animateCursor();

    const interactiveElements = document.querySelectorAll('a, button, .tilt-card, .skill-tag, input, .cursor-btn');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  // --- 3. 3D CARD TILT & MOUSE SPOTLIGHT ---
  const tiltCards = document.querySelectorAll('.tilt-card');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = -((y - centerY) / centerY) * 8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });

  // --- 4. MOBILE MENU TOGGLE ---
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  const navLinkItems = document.querySelectorAll('.nav-link');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      navLinks.classList.toggle('mobile-open');
    });

    navLinkItems.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navLinks.classList.remove('mobile-open');
      });
    });
  }

  // --- 5. NAVBAR BACKGROUND SCROLL EFFECT ---
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // --- 6. SCROLL TRIGGER ANIMATIONS ---
  const animateElements = document.querySelectorAll('.animate-on-scroll');

  const animationObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.15
  });

  animateElements.forEach(el => animationObserver.observe(el));

  // --- 7. NAVBAR ACTIVE SECTION INDICATOR ---
  const sections = document.querySelectorAll('section[id]');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute('id');
        navLinkItems.forEach(link => {
          if (link.getAttribute('href') === `#${currentId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    root: null,
    rootMargin: '-30% 0px -30% 0px',
    threshold: 0
  });

  sections.forEach(section => sectionObserver.observe(section));
});
