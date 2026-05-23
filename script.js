/* ========================================
   Chotto Cafe - JavaScript
   ======================================== */

// ---------- ヘッダースクロール ----------
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 120) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}, { passive: true });

// ---------- ハンバーガーメニュー ----------
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('open');
});

// モバイルメニューリンクをクリックで閉じる
document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
  });
});

// ---------- スクロールアニメーション ----------
const revealEls = document.querySelectorAll(
  '.section-label, .section-title, .section-subtitle, ' +
  '.about-message, .gallery-item, ' +
  '.menu-card, .menu-link-btn, ' +
  '.info-card, .sns-section, ' +
  '.map-wrap, .access-item'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${(i % 5) * 0.08}s`;
  revealObserver.observe(el);
});

// ---------- メニューモーダル ----------
function openMenuModal(type) {
  const modal = document.getElementById(`${type}-modal`);
  if (!modal) return;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeMenuModal(type) {
  const modal = document.getElementById(`${type}-modal`);
  if (!modal) return;
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// ESCキーでモーダルを閉じる
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeMenuModal('drink');
    closeMenuModal('food');
  }
});

// ---------- アクティブナビリンク ----------
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.remove('active-nav');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active-nav');
        }
      });
    }
  });
}, { rootMargin: '-40% 0px -50% 0px' });

sections.forEach(section => sectionObserver.observe(section));
