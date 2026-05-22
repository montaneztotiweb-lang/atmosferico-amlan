/* Atmosférico A.M. LAN — main.js */

(function () {
  'use strict';

  /* ---- Menú hamburguesa ---- */
  const hamburger = document.querySelector('.header__hamburger');
  const drawer    = document.querySelector('.header__drawer');
  const drawerLinks = document.querySelectorAll('.header__drawer-link');

  if (hamburger && drawer) {
    function openMenu() {
      drawer.classList.add('is-open');
      hamburger.setAttribute('aria-expanded', 'true');
      drawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      drawer.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
      drawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', function () {
      const isOpen = drawer.classList.contains('is-open');
      isOpen ? closeMenu() : openMenu();
    });

    drawerLinks.forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });

    /* Cerrar al hacer clic fuera del drawer */
    document.addEventListener('click', function (e) {
      if (
        drawer.classList.contains('is-open') &&
        !drawer.contains(e.target) &&
        !hamburger.contains(e.target)
      ) {
        closeMenu();
      }
    });
  }

  /* ---- Scroll suave para anclas ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* ---- Animaciones reveal al scroll ---- */
  if ('IntersectionObserver' in window) {
    const revealItems = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    /* Delay escalonado en cards del mismo grid */
    document.querySelectorAll('.services-grid, .diferencial-grid').forEach(function (grid) {
      grid.querySelectorAll('.reveal').forEach(function (card, i) {
        card.style.transitionDelay = (i * 80) + 'ms';
      });
    });

    revealItems.forEach(function (item) {
      revealObserver.observe(item);
    });
  } else {
    /* Fallback sin IntersectionObserver */
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ---- Carrusel de testimonios (dots + autoplay) ---- */
  const track = document.querySelector('.testimonios-track');
  const dots  = document.querySelectorAll('.testimonios-dot');

  if (track && dots.length) {
    var autoplayTimer;
    var AUTOPLAY_DELAY = 5000;

    function updateDots(index) {
      dots.forEach(function (dot, i) {
        dot.classList.toggle('testimonios-dot--active', i === index);
        dot.setAttribute('aria-selected', i === index ? 'true' : 'false');
      });
    }

    function getCurrentIndex() {
      var current = 0;
      dots.forEach(function (dot, i) {
        if (dot.classList.contains('testimonios-dot--active')) current = i;
      });
      return current;
    }

    function goToCard(index) {
      var cards = track.querySelectorAll('.testimonio-card');
      if (!cards[index]) return;
      track.scrollTo({ left: cards[index].offsetLeft, behavior: 'smooth' });
      updateDots(index);
    }

    function startAutoplay() {
      clearInterval(autoplayTimer);
      autoplayTimer = setInterval(function () {
        var next = (getCurrentIndex() + 1) % dots.length;
        goToCard(next);
      }, AUTOPLAY_DELAY);
    }

    function stopAutoplay() {
      clearInterval(autoplayTimer);
    }

    dots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        var index = parseInt(this.dataset.index, 10);
        goToCard(index);
        stopAutoplay();
        setTimeout(startAutoplay, AUTOPLAY_DELAY);
      });
    });

    /* Actualizar dot activo al hacer scroll libre */
    var scrollTimer;
    track.addEventListener('scroll', function () {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(function () {
        var cards = track.querySelectorAll('.testimonio-card');
        var closest = 0;
        var minDiff = Infinity;
        cards.forEach(function (card, i) {
          var diff = Math.abs(card.offsetLeft - track.scrollLeft);
          if (diff < minDiff) { minDiff = diff; closest = i; }
        });
        updateDots(closest);
      }, 80);
    });

    /* Pausar con mouse o touch */
    track.addEventListener('mouseenter', stopAutoplay);
    track.addEventListener('mouseleave', startAutoplay);
    track.addEventListener('touchstart', stopAutoplay, { passive: true });
    track.addEventListener('touchend', function () {
      setTimeout(startAutoplay, 3000);
    }, { passive: true });

    startAutoplay();
  }

  /* ---- Contadores animados (stats strip) ---- */
  function animateCounter(el) {
    var target   = parseInt(el.dataset.target, 10);
    var duration = 1800;
    var start    = performance.now();

    function update(now) {
      var elapsed  = now - start;
      var progress = Math.min(elapsed / duration, 1);
      var eased    = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target;
      }
    }
    requestAnimationFrame(update);
  }

  if ('IntersectionObserver' in window) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.stat-number').forEach(animateCounter);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    var statsStrip = document.querySelector('.stats-strip');
    if (statsStrip) counterObserver.observe(statsStrip);
  } else {
    /* Fallback: mostrar números finales directamente */
    document.querySelectorAll('.stat-number').forEach(function (el) {
      el.textContent = el.dataset.target;
    });
  }

  /* ---- Header: sombra reforzada al hacer scroll ---- */
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.style.boxShadow = window.scrollY > 10
        ? '0 4px 20px rgba(0,0,0,0.3)'
        : '0 2px 8px rgba(0,0,0,0.25)';
    }, { passive: true });
  }

})();
