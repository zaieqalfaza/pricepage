/* ===== PriceCraft Landing Page — JavaScript ===== */

document.addEventListener('DOMContentLoaded', function () {

  // ===== Add reveal-wait class to sections AFTER page loads =====
  // This ensures content is visible even if JS fails
  var sections = document.querySelectorAll('.section-hidden');
  sections.forEach(function (s) {
    s.classList.add('reveal-wait');
  });

  // ===== Particle Animation =====
  var canvas = document.getElementById('particles-canvas');
  if (canvas) {
    var ctx = canvas.getContext('2d');
    var PC = 60;
    var particles = [];

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function Particle() {
      this.x = 0; this.y = 0; this.size = 0; this.speedX = 0; this.speedY = 0; this.opacity = 0;
      this.reset();
    }
    Particle.prototype.reset = function () {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.3 + 0.05;
    };
    Particle.prototype.update = function () {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    };
    Particle.prototype.draw = function () {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(34,197,94,' + this.opacity + ')';
      ctx.fill();
    };

    for (var i = 0; i < PC; i++) particles.push(new Particle());

    function drawConnections() {
      for (var i = 0; i < particles.length; i++) {
        for (var j = i + 1; j < particles.length; j++) {
          var dx = particles[i].x - particles[j].x;
          var dy = particles[i].y - particles[j].y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = 'rgba(34,197,94,' + (0.03 * (1 - dist / 150)) + ')';
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (var i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      drawConnections();
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  // ===== Mobile Menu =====
  var mobileMenuBtn = document.getElementById('mobile-menu-btn');
  var mobileMenuClose = document.getElementById('mobile-menu-close');
  var mobileMenu = document.getElementById('mobile-menu');
  var mobileLinks = document.querySelectorAll('.mobile-link');

  function openMenu() {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }
  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMenu);
  if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMenu);
  mobileLinks.forEach(function (l) { l.addEventListener('click', closeMenu); });

  // ===== Navbar Scroll =====
  var navbar = document.getElementById('navbar');
  function handleNavbarScroll() {
    if (navbar) {
      navbar.style.borderBottom = window.pageYOffset > 80 ? '1px solid rgba(34,197,94,0.1)' : 'none';
    }
  }
  window.addEventListener('scroll', handleNavbarScroll);

  // ===== Floating CTA =====
  var floatingCta = document.getElementById('floating-cta');
  function handleFloatingCta() {
    if (floatingCta) {
      floatingCta.style.transform = window.pageYOffset > 600 ? 'translateY(0)' : 'translateY(100%)';
    }
  }
  window.addEventListener('scroll', handleFloatingCta);

  // ===== Section Reveal (IntersectionObserver) =====
  var sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('section-visible');
        e.target.classList.remove('reveal-wait');
        sectionObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  sections.forEach(function (s) { sectionObserver.observe(s); });

  // ===== Toast Notifications =====
  var toastNames = [
    { name: 'Rina dari Jakarta', time: '2 menit lalu' },
    { name: 'Ahmad dari Bandung', time: '5 menit lalu' },
    { name: 'Diana dari Surabaya', time: '8 menit lalu' },
    { name: 'Budi dari Yogyakarta', time: '12 menit lalu' },
    { name: 'Sari dari Semarang', time: '15 menit lalu' },
    { name: 'Andi dari Medan', time: '20 menit lalu' },
  ];
  var toastIndex = 0;

  function showToast() {
    var toast = document.getElementById('toast');
    if (!toast) return;
    var data = toastNames[toastIndex % toastNames.length];
    var nameEl = document.getElementById('toast-name');
    var timeEl = document.getElementById('toast-time');
    if (nameEl) nameEl.textContent = data.name;
    if (timeEl) timeEl.textContent = data.time;
    toast.classList.add('show');
    toastIndex++;
    setTimeout(function () { toast.classList.remove('show'); }, 4000);
  }

  setTimeout(function () {
    showToast();
    setInterval(showToast, 25000);
  }, 8000);

  // ===== Slot Count Animation =====
  var slotEl = document.getElementById('slot-count');
  if (slotEl) {
    var target = 27;
    var current = 0;
    function step() {
      if (current < target) {
        current++;
        slotEl.textContent = String(current);
        setTimeout(step, 50);
      }
    }
    var slotObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          step();
          slotObserver.unobserve(e.target);
        }
      });
    });
    slotObserver.observe(slotEl);
  }

  // ===== Smooth Scroll =====
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var href = a.getAttribute('href');
      if (href) {
        var t = document.querySelector(href);
        if (t) {
          window.scrollTo({
            top: t.getBoundingClientRect().top + window.pageYOffset - 80,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // ===== FAQ Toggle =====
  document.querySelectorAll('.faq-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var answer = btn.nextElementSibling;
      var icon = btn.querySelector('.iconify');
      var isOpen = answer && answer.classList.contains('open');
      document.querySelectorAll('.faq-answer').forEach(function (a) { a.classList.remove('open'); });
      document.querySelectorAll('.faq-btn .iconify').forEach(function (i) { i.style.transform = 'rotate(0deg)'; });
      if (!isOpen && answer) {
        answer.classList.add('open');
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  });

  // ===== Screenshot Tab Switching =====
  window.switchTab = function (tabName) {
    document.querySelectorAll('.screenshot-panel').forEach(function (p) { p.classList.remove('active'); });
    document.querySelectorAll('.screenshot-tab').forEach(function (t) {
      t.classList.remove('active');
      t.style.borderColor = 'rgba(255,255,255,0.1)';
      t.style.background = 'rgba(255,255,255,0.02)';
      t.querySelectorAll('span').forEach(function (s) {
        if (s.classList.contains('iconify')) return;
        s.classList.remove('text-brand-400');
        s.classList.add('text-neutral-400');
      });
    });
    var panel = document.getElementById('tab-' + tabName);
    var activeBtn = document.querySelector('[data-tab="' + tabName + '"]');
    if (panel) panel.classList.add('active');
    if (activeBtn) {
      activeBtn.classList.add('active');
      activeBtn.style.borderColor = 'rgba(34,197,94,0.6)';
      activeBtn.style.background = 'rgba(34,197,94,0.1)';
      activeBtn.querySelectorAll('span').forEach(function (s) {
        if (s.classList.contains('iconify')) return;
        s.classList.remove('text-neutral-400');
        s.classList.add('text-brand-400');
      });
    }
  };

  // ===== Toast Dismiss =====
  window.hideToast = function () {
    var toast = document.getElementById('toast');
    if (toast) toast.classList.remove('show');
  };

});
