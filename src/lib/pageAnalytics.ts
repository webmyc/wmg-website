// Page-level analytics tracking
import { track, trackScrollDepth, trackSectionView } from './analytics';

export function initPageAnalytics() {
  // Track scroll depth
  let maxScrollDepth = 0;
  let scrollDepthTracked = new Set<number>();
  
  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.round((scrollTop / documentHeight) * 100);
    
    if (scrollPercent > maxScrollDepth) {
      maxScrollDepth = scrollPercent;
      trackScrollDepth(maxScrollDepth);
    }
  };
  
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  // Track section views
  const sections = [
    { id: 'hero', name: 'Hero' },
    { id: 'what-is', name: 'What Is' },
    { id: 'gatherings', name: 'Gatherings' },
    { id: 'signup', name: 'Signup Form' },
    { id: 'council', name: 'Inner Council' }
  ];
  
  sections.forEach(section => {
    const element = document.getElementById(section.id);
    if (element) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            trackSectionView(section.name);
            observer.disconnect(); // Only track once per section
          }
        });
      }, { threshold: 0.5 });
      
      observer.observe(element);
    }
  });
  
  // Track page load time
  window.addEventListener('load', () => {
    const loadTime = performance.now();
    track('page_load_time', {
      load_time: Math.round(loadTime),
      connection_type: (navigator as any).connection?.effectiveType || 'unknown'
    });
  });
  
  // Track gathering item interactions
  const gatheringItems = document.querySelectorAll('.gathering-item');
  gatheringItems.forEach((item, index) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const title = item.querySelector('h3')?.textContent || `Gathering ${index + 1}`;
          track('gathering_interaction', {
            gathering: title,
            action: 'view'
          });
          observer.disconnect();
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(item);
  });
  
  // Track external link clicks
  const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="wholemengathering.org"])');
  externalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      const text = link.textContent?.trim() || 'External Link';
      
      if (href) {
        track('external_link_click', {
          url: href,
          text: text,
          location: link.closest('section')?.id || 'unknown'
        });
      }
    });
  });
  
  // Track page visibility changes
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      track('page_visibility', { status: 'hidden' });
    } else {
      track('page_visibility', { status: 'visible' });
    }
  });
  
  // Track errors
  window.addEventListener('error', (e) => {
    track('javascript_error', {
      message: e.message,
      filename: e.filename,
      lineno: e.lineno,
      colno: e.colno
    });
  });
  
  // Track unhandled promise rejections
  window.addEventListener('unhandledrejection', (e) => {
    track('unhandled_promise_rejection', {
      reason: e.reason?.toString() || 'Unknown error'
    });
  });
}

