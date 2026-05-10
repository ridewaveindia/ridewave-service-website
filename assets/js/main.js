

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle, .faq-item .faq-header').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

  /* ============================================================
       AI / Premium Enhancement Scripts
       ============================================================ */
  (function () {
    'use strict';

    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var isCoarsePointer = window.matchMedia('(hover: none), (pointer: coarse)').matches;

    /* =============================================================
       1) NEURAL NETWORK CANVAS — site-wide subtle layer
       ============================================================= */
    (function neuralCanvas() {
      if (prefersReducedMotion) return;
      var canvas = document.getElementById('ai-neural-canvas');
      if (!canvas) return;
      var ctx = canvas.getContext('2d');
      var w, h, dpr = window.devicePixelRatio || 1;
      var particles = [];
      var mouse = { x: -9999, y: -9999 };
      var PARTICLE_COUNT = isCoarsePointer ? 30 : 55;
      var LINK_DIST = 130;

      function resize() {
        w = window.innerWidth;
        h = window.innerHeight;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }

      function makeParticle() {
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          r: Math.random() * 1.6 + 0.6
        };
      }

      function init() {
        particles = [];
        for (var i = 0; i < PARTICLE_COUNT; i++) particles.push(makeParticle());
      }

      function step() {
        ctx.clearRect(0, 0, w, h);
        for (var i = 0; i < particles.length; i++) {
          var p = particles[i];
          p.x += p.vx;
          p.y += p.vy;

          var dx = p.x - mouse.x;
          var dy = p.y - mouse.y;
          var d2 = dx * dx + dy * dy;
          if (d2 < 14000) {
            var d = Math.sqrt(d2) || 1;
            p.x += (dx / d) * 0.6;
            p.y += (dy / d) * 0.6;
          }

          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 138, 0, 0.85)';
          ctx.fill();
        }

        for (var i = 0; i < particles.length; i++) {
          for (var j = i + 1; j < particles.length; j++) {
            var a = particles[i], b = particles[j];
            var dxl = a.x - b.x, dyl = a.y - b.y;
            var dist = Math.sqrt(dxl * dxl + dyl * dyl);
            if (dist < LINK_DIST) {
              var alpha = (1 - dist / LINK_DIST) * 0.35;
              ctx.strokeStyle = 'rgba(255, 138, 0, ' + alpha + ')';
              ctx.lineWidth = 0.7;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }

          var mdx = particles[i].x - mouse.x;
          var mdy = particles[i].y - mouse.y;
          var md = Math.sqrt(mdx * mdx + mdy * mdy);
          if (md < 180) {
            var ma = (1 - md / 180) * 0.5;
            ctx.strokeStyle = 'rgba(255, 169, 64, ' + ma + ')';
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }

        requestAnimationFrame(step);
      }

      window.addEventListener('resize', function () { resize(); init(); }, { passive: true });
      window.addEventListener('mousemove', function (e) { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
      window.addEventListener('mouseout', function () { mouse.x = -9999; mouse.y = -9999; }, { passive: true });
      window.addEventListener('touchmove', function (e) {
        if (e.touches && e.touches[0]) { mouse.x = e.touches[0].clientX; mouse.y = e.touches[0].clientY; }
      }, { passive: true });

      resize(); init(); step();
    })();

    /* =============================================================
       2) HERO PARTICLES — denser, hero-only
       ============================================================= */
    (function heroParticles() {
      if (prefersReducedMotion) return;
      var canvas = document.getElementById('hero-particles');
      if (!canvas) return;
      var hero = document.getElementById('hero');
      if (!hero) return;
      var ctx = canvas.getContext('2d');
      var w, h, dpr = window.devicePixelRatio || 1;
      var particles = [];
      var COUNT = isCoarsePointer ? 40 : 90;
      var LINK_DIST = 150;
      var mouse = { x: -9999, y: -9999, in: false };

      function resize() {
        var rect = hero.getBoundingClientRect();
        w = rect.width;
        h = rect.height;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }

      function makeP() {
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          r: Math.random() * 2.0 + 0.8,
          pulse: Math.random() * Math.PI * 2
        };
      }

      function init() {
        particles = [];
        for (var i = 0; i < COUNT; i++) particles.push(makeP());
      }

      function step() {
        ctx.clearRect(0, 0, w, h);

        for (var i = 0; i < particles.length; i++) {
          var p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.pulse += 0.04;

          if (mouse.in) {
            var dx = p.x - mouse.x;
            var dy = p.y - mouse.y;
            var d2 = dx * dx + dy * dy;
            if (d2 < 18000) {
              var d = Math.sqrt(d2) || 1;
              p.x += (dx / d) * 0.9;
              p.y += (dy / d) * 0.9;
            }
          }

          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;

          var pulseR = p.r + Math.sin(p.pulse) * 0.5;
          var grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, pulseR * 4);
          grad.addColorStop(0, 'rgba(255, 138, 0, 0.95)');
          grad.addColorStop(0.4, 'rgba(255, 138, 0, 0.4)');
          grad.addColorStop(1, 'rgba(255, 138, 0, 0)');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, pulseR * 4, 0, Math.PI * 2);
          ctx.fill();

          ctx.beginPath();
          ctx.arc(p.x, p.y, pulseR, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 138, 0, 1)';
          ctx.fill();
        }

        for (var i = 0; i < particles.length; i++) {
          for (var j = i + 1; j < particles.length; j++) {
            var a = particles[i], b = particles[j];
            var dxl = a.x - b.x, dyl = a.y - b.y;
            var dist = Math.sqrt(dxl * dxl + dyl * dyl);
            if (dist < LINK_DIST) {
              var alpha = (1 - dist / LINK_DIST) * 0.4;
              ctx.strokeStyle = 'rgba(255, 138, 0, ' + alpha + ')';
              ctx.lineWidth = 0.8;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }

          if (mouse.in) {
            var mdx = particles[i].x - mouse.x;
            var mdy = particles[i].y - mouse.y;
            var md = Math.sqrt(mdx * mdx + mdy * mdy);
            if (md < 200) {
              var ma = (1 - md / 200) * 0.6;
              ctx.strokeStyle = 'rgba(255, 169, 64, ' + ma + ')';
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(mouse.x, mouse.y);
              ctx.stroke();
            }
          }
        }

        requestAnimationFrame(step);
      }

      function setMouseFromEvent(e) {
        var rect = hero.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
        mouse.in = (mouse.x >= 0 && mouse.x <= w && mouse.y >= 0 && mouse.y <= h);
      }

      window.addEventListener('resize', function () { resize(); init(); }, { passive: true });
      window.addEventListener('mousemove', setMouseFromEvent, { passive: true });
      window.addEventListener('mouseout', function () { mouse.in = false; }, { passive: true });
      window.addEventListener('touchmove', function (e) {
        if (e.touches && e.touches[0]) {
          var t = { clientX: e.touches[0].clientX, clientY: e.touches[0].clientY };
          setMouseFromEvent(t);
        }
      }, { passive: true });

      resize(); init(); step();
    })();

    /* =============================================================
       3) HERO ROTATING WORD — typewriter effect
       ============================================================= */
    (function heroRotator() {
      var el = document.getElementById('heroRotator');
      if (!el) return;
      var words = ['AI-Driven', 'Cloud-Native', 'Future-Ready', 'Intelligent', 'Scalable', 'Secure'];
      var wIdx = 0, cIdx = 0, deleting = false;
      var delay = 110;

      function tick() {
        var current = words[wIdx];
        if (!deleting) {
          cIdx++;
          el.textContent = current.slice(0, cIdx);
          if (cIdx >= current.length) {
            deleting = true;
            delay = 1600;
          } else {
            delay = 90 + Math.random() * 70;
          }
        } else {
          cIdx--;
          el.textContent = current.slice(0, cIdx);
          if (cIdx <= 0) {
            deleting = false;
            wIdx = (wIdx + 1) % words.length;
            delay = 200;
          } else {
            delay = 45;
          }
        }
        setTimeout(tick, delay);
      }
      // Start after AOS settles
      setTimeout(tick, 900);
    })();

    /* =============================================================
       4) CUSTOM AI CURSOR — desktop only
       ============================================================= */
    (function aiCursor() {
      if (prefersReducedMotion || isCoarsePointer) return;

      var cursor = document.getElementById('aiCursor');
      var dot = document.getElementById('aiCursorDot');
      if (!cursor || !dot) return;

      document.body.classList.add('ai-cursor-active');

      var cx = window.innerWidth / 2, cy = window.innerHeight / 2;
      var dx = cx, dy = cy;
      var rx = cx, ry = cy;

      window.addEventListener('mousemove', function (e) {
        cx = e.clientX; cy = e.clientY;
      });

      function tick() {
        rx += (cx - rx) * 0.18;
        ry += (cy - ry) * 0.18;
        dx += (cx - dx) * 0.55;
        dy += (cy - dy) * 0.55;
        cursor.style.transform = 'translate(' + rx + 'px,' + ry + 'px) translate(-50%,-50%)';
        dot.style.transform = 'translate(' + dx + 'px,' + dy + 'px) translate(-50%,-50%)';
        requestAnimationFrame(tick);
      }
      tick();

      var hoverables = 'a, button, .feature-item, .portfolio-card, .industry-chip, .tech-card, .stat-card, .info-card, .achievement-item, .faq-item, .service-card, .featured-service-card, .social-icon, input, textarea, .hero-chip, .rw-foot-social a, .rw-foot-list a';
      document.addEventListener('mouseover', function (e) {
        if (e.target.closest(hoverables)) cursor.classList.add('is-hover');
      });
      document.addEventListener('mouseout', function (e) {
        if (e.target.closest(hoverables)) cursor.classList.remove('is-hover');
      });
      document.addEventListener('mousedown', function () { cursor.classList.add('is-click'); });
      document.addEventListener('mouseup',   function () { cursor.classList.remove('is-click'); });
    })();

    /* =============================================================
       5) 3D TILT
       ============================================================= */
    (function tilt() {
      if (prefersReducedMotion || isCoarsePointer) return;
      var TILT_MAX = 8;
      var els = document.querySelectorAll('.ai-tilt');
      els.forEach(function (el) {
        el.addEventListener('mousemove', function (e) {
          var rect = el.getBoundingClientRect();
          var px = (e.clientX - rect.left) / rect.width;
          var py = (e.clientY - rect.top) / rect.height;
          var rx = (py - 0.5) * -2 * TILT_MAX;
          var ry = (px - 0.5) *  2 * TILT_MAX;
          el.style.transform = 'perspective(900px) rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg) translateZ(0)';
        });
        el.addEventListener('mouseleave', function () {
          el.style.transform = '';
        });
      });
    })();

    /* =============================================================
       6) MAGNETIC BUTTONS
       ============================================================= */
    (function magnetic() {
      if (prefersReducedMotion || isCoarsePointer) return;
      var STRENGTH = 0.35;
      var els = document.querySelectorAll('.ai-magnetic');
      els.forEach(function (el) {
        el.addEventListener('mousemove', function (e) {
          var rect = el.getBoundingClientRect();
          var x = e.clientX - rect.left - rect.width / 2;
          var y = e.clientY - rect.top - rect.height / 2;
          el.style.transform = 'translate(' + (x * STRENGTH).toFixed(2) + 'px,' + (y * STRENGTH).toFixed(2) + 'px)';
        });
        el.addEventListener('mouseleave', function () {
          el.style.transform = '';
        });
      });
    })();

    /* =============================================================
       7) STAT COUNTERS
       ============================================================= */
    (function counters() {
      var els = document.querySelectorAll('[data-counter]');
      if (!els.length || !('IntersectionObserver' in window)) return;

      function format(n, decimals) {
        return decimals > 0 ? n.toFixed(decimals) : Math.round(n).toLocaleString();
      }
      function animate(el) {
        var target = parseFloat(el.getAttribute('data-target')) || 0;
        var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
        var suffix = el.getAttribute('data-suffix') || '';
        var prefix = el.getAttribute('data-prefix') || '';
        var dur = 1800;
        var t0 = null;
        function frame(t) {
          if (!t0) t0 = t;
          var p = Math.min(1, (t - t0) / dur);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = prefix + format(target * eased, decimals) + suffix;
          if (p < 1) requestAnimationFrame(frame);
          else el.textContent = prefix + format(target, decimals) + suffix;
        }
        requestAnimationFrame(frame);
      }
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animate(entry.target);
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.4 });
      els.forEach(function (el) { io.observe(el); });
    })();

    /* =============================================================
       8) SCROLL PROGRESS BAR
       ============================================================= */
    (function scrollProgress() {
      var bar = document.getElementById('aiScrollProgress');
      if (!bar) return;
      function update() {
        var st = window.scrollY || document.documentElement.scrollTop;
        var sh = (document.documentElement.scrollHeight - document.documentElement.clientHeight);
        var p = sh > 0 ? (st / sh) * 100 : 0;
        bar.style.width = p + '%';
      }
      window.addEventListener('scroll', update, { passive: true });
      update();
    })();

    /* =============================================================
       9) HEADER GLASS ON SCROLL
       ============================================================= */
    (function headerGlass() {
      var header = document.getElementById('header');
      if (!header) return;
      function check() {
        if ((window.scrollY || 0) > 60) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
      }
      window.addEventListener('scroll', check, { passive: true });
      check();
    })();

  })();
