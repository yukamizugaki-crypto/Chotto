/* ========================================
   Chotto Cafe - JavaScript
   ======================================== */

// ---------- オープニングアニメーション ----------
document.addEventListener('DOMContentLoaded', () => {
  const subtitleEl = document.getElementById('loader-subtitle-text');
  const loader = document.getElementById('opening-loader');
  
  if (subtitleEl && loader) {
    // 文字列を1文字ずつのスパンに分割し、アニメーション遅延を設定するヘルパー
    const animateText = (el, startDelay, charSpeed) => {
      const text = el.textContent;
      el.innerHTML = '';
      [...text].forEach((char, i) => {
        const span = document.createElement('span');
        span.className = 'char-span';
        span.textContent = char === ' ' ? '\u00A0' : char; // 半角スペースの保持
        span.style.animationDelay = `${startDelay + i * charSpeed}s`;
        el.appendChild(span);
      });
      return startDelay + text.length * charSpeed;
    };
    
    // サブタイトルのアニメーション (ロゴ表示の0.5秒後から即座に開始)
    const subtitleDelay = 0.5;
    const subtitleEnd = animateText(subtitleEl, subtitleDelay, 0.08);
    
    // すべてのアニメーションが完了した0.8秒後にフェードアウト
    setTimeout(() => {
      loader.classList.add('fade-out');
    }, (subtitleEnd + 0.8) * 1000);
  }
});

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
  '.about-message, .gallery-frame, ' +
  '.menu-card, .menu-link-row, ' +
  '.info-table-cell, .instagram-banner-box, ' +
  '.map-wrap, .access-row, ' +
  '.hero-handwritten, .about-handwritten, .menu-handwritten-note-top, ' +
  '.menu-handwritten-note-mid, .info-handwritten, .access-handwritten, ' +
  '.section-header-asym, .menu-links-list'
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
