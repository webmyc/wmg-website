// src/components/SectionReveal.ts
export default function mountReveal(selector = '.reveal') {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  
  const els = Array.from(document.querySelectorAll<HTMLElement>(selector));
  if (!els.length) return;
  
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { 
      if (e.isIntersecting) { 
        e.target.classList.add('is-in'); 
        io.unobserve(e.target);
      }
    });
  }, {
    rootMargin: '-5% 0px -10% 0px', 
    threshold: 0.1
  });
  
  els.forEach(el => io.observe(el));
}
