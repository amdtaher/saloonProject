const root = document.documentElement;
const body = document.body;
const themeToggle = document.querySelector('#themeToggle');
const menuButton = document.querySelector('#menuButton');
const siteNav = document.querySelector('#siteNav');
const bookingForm = document.querySelector('#bookingForm');
const formStatus = document.querySelector('#formStatus');
const serviceSelect = document.querySelector('select[name="service"]');
const selectedServiceNotice = document.querySelector('#selectedServiceNotice');
const testimonialTrack = document.querySelector('#testimonialTrack');
const testimonialPrev = document.querySelector('#testimonialPrev');
const testimonialNext = document.querySelector('#testimonialNext');
const testimonialDots = document.querySelector('#testimonialDots');
const blogDetail = document.querySelector('#blogDetail');
const blogTitle = document.querySelector('#blogTitle');
const blogBody = document.querySelector('#blogBody');
const blogClose = document.querySelector('#blogClose');
const toTopButton = document.querySelector('#toTopButton');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const reduceMotion = prefersReducedMotion;

const blogContent = {
  cuts: {
    title: 'How often should you cut?',
    body: 'Short fades usually need a refresh every two to three weeks. Medium styles can wait four to six weeks, while longer layered cuts often hold for six to eight weeks. The best schedule depends on neckline growth, hair texture, and how polished you want the shape to stay.'
  },
  beard: {
    title: 'Beard shape by face type',
    body: 'A rounder face usually benefits from a tighter cheek line and more length at the chin. A longer face often looks better with fuller sides and less chin length. Bring a reference, but let the barber adjust the geometry to your actual jaw and growth pattern.'
  },
  color: {
    title: 'Color consult checklist',
    body: 'Before changing color, know your recent dye history, heat styling habits, maintenance budget, and how often you can return. Good color work starts with honesty about the current hair condition, then moves into shade, tone, and aftercare.'
  }
};

function createIcons() {
  window.lucide?.createIcons({ strokeWidth: 1.8 });
}

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  localStorage.setItem('veloura-theme', theme);
  const isLight = theme === 'light';
  body.classList.toggle('bg-[#f7efe4]', isLight);
  body.classList.toggle('bg-[#18120f]', !isLight);
  body.classList.toggle('text-[#211915]', isLight);
  body.classList.toggle('text-[#fff7ec]', !isLight);
  const icon = themeToggle?.querySelector('i');
  if (icon) icon.setAttribute('data-lucide', isLight ? 'moon' : 'sun');
  createIcons();
}

applyTheme(localStorage.getItem('veloura-theme') || 'dark');
createIcons();

themeToggle?.addEventListener('click', () => {
  applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  const nextOpen = !open;
  menuButton.setAttribute('aria-expanded', String(nextOpen));
  menuButton.setAttribute('aria-label', nextOpen ? 'Close menu' : 'Open menu');
  siteNav?.classList.toggle('mobile-open', nextOpen);
});

function scrollToTarget(target) {
  target?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const id = link.getAttribute('href');
    const target = id && id.length > 1 ? document.querySelector(id) : null;
    if (!target) return;
    event.preventDefault();
    siteNav?.classList.remove('mobile-open');
    if (menuButton) {
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open menu');
    }
    scrollToTarget(target);
  });
});

const revealItems = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

document.querySelectorAll('.service-option').forEach((card) => {
  card.addEventListener('click', () => {
    const service = card.dataset.service;
    if (!service || !serviceSelect) return;
    serviceSelect.value = service;
    document.querySelectorAll('.service-option').forEach((item) => item.classList.remove('is-selected'));
    card.classList.add('is-selected');
    if (selectedServiceNotice) {
      selectedServiceNotice.textContent = `${service} has been added. Now fill up your info to submit the booking request.`;
      selectedServiceNotice.classList.remove('hidden');
    }
    scrollToTarget(document.querySelector('#booking'));
  });
});

let testimonialIndex = 0;
const testimonialCount = testimonialTrack?.children.length || 0;
function updateTestimonials() {
  if (!testimonialTrack) return;
  testimonialTrack.style.transform = `translateX(-${testimonialIndex * 100}%)`;
  testimonialDots?.querySelectorAll('button').forEach((dot, index) => {
    dot.classList.toggle('bg-[#e4c277]', index === testimonialIndex);
    dot.classList.toggle('bg-white/20', index !== testimonialIndex);
  });
}

if (testimonialTrack && testimonialDots) {
  for (let i = 0; i < testimonialCount; i += 1) {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'motion h-2.5 w-2.5 rounded-full bg-white/20';
    dot.setAttribute('aria-label', `Show testimonial ${i + 1}`);
    dot.addEventListener('click', () => {
      testimonialIndex = i;
      updateTestimonials();
    });
    testimonialDots.appendChild(dot);
  }
  updateTestimonials();
}

testimonialPrev?.addEventListener('click', () => {
  testimonialIndex = (testimonialIndex - 1 + testimonialCount) % testimonialCount;
  updateTestimonials();
});

testimonialNext?.addEventListener('click', () => {
  testimonialIndex = (testimonialIndex + 1) % testimonialCount;
  updateTestimonials();
});

document.querySelectorAll('.blog-card').forEach((card) => {
  const openBlog = () => {
    const article = blogContent[card.dataset.blog];
    if (!article || !blogDetail || !blogTitle || !blogBody) return;
    blogTitle.textContent = article.title;
    blogBody.textContent = article.body;
    blogDetail.classList.remove('hidden');
    blogDetail.classList.add('is-visible');
    scrollToTarget(blogDetail);
  };
  card.addEventListener('click', openBlog);
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openBlog();
    }
  });
});

blogClose?.addEventListener('click', () => {
  blogDetail?.classList.add('hidden');
});


window.addEventListener('scroll', () => {
  if (!toTopButton) return;
  const showAfter = window.innerHeight * 1.2;
  toTopButton.classList.toggle('hidden', window.scrollY < showAfter);
  toTopButton.classList.toggle('grid', window.scrollY >= showAfter);
}, { passive: true });

toTopButton?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
});
bookingForm?.addEventListener('submit', () => {
  if (formStatus) {
    formStatus.textContent = 'Sending booking request to monniebcollins@gmail.com...';
  }
});

