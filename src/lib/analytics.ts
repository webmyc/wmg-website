// Custom analytics tracking for WMG site
// Simple custom tracking that can be extended with Vercel Analytics later

function track(eventName: string, properties?: Record<string, any>) {
  // Custom tracking implementation
  console.log('Analytics Event:', eventName, properties);
  
  // Send to custom analytics endpoint or third-party service
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, properties);
  }
  
  // Future: Send to Vercel Analytics when properly configured
  // trackVercel(eventName, properties);
}

// Event categories for better organization
export const AnalyticsEvents = {
  // Navigation events
  NAVIGATION: 'navigation',
  
  // Engagement events
  ENGAGEMENT: 'engagement',
  
  // Conversion events
  CONVERSION: 'conversion',
  
  // Audio events
  AUDIO: 'audio',
  
  // Form events
  FORM: 'form'
} as const;

// Track button clicks and CTAs
export function trackButtonClick(buttonName: string, location?: string) {
  track('button_click', {
    button: buttonName,
    location: location || 'unknown'
  });
}

// Track form interactions
export function trackFormEvent(event: 'start' | 'submit' | 'error', formName: string, details?: Record<string, any>) {
  track('form_interaction', {
    event,
    form: formName,
    ...details
  });
}

// Track audio interactions
export function trackAudioEvent(event: 'play' | 'pause' | 'toggle', action: string) {
  track('audio_interaction', {
    event,
    action
  });
}

// Track section views
export function trackSectionView(sectionName: string) {
  track('section_view', {
    section: sectionName
  });
}

// Track link clicks
export function trackLinkClick(linkText: string, destination: string, location?: string) {
  track('link_click', {
    link_text: linkText,
    destination,
    location: location || 'unknown'
  });
}

// Track scroll depth
export function trackScrollDepth(depth: number) {
  if (depth === 25 || depth === 50 || depth === 75 || depth === 100) {
    track('scroll_depth', {
      depth: `${depth}%`
    });
  }
}

// Export the main track function
export { track };

// Track gathering interest
export function trackGatheringInterest(gatheringTitle: string, action: 'view' | 'click') {
  track('gathering_interaction', {
    gathering: gatheringTitle,
    action
  });
}

// Track council member interaction
export function trackCouncilInteraction(memberName: string, action: 'view' | 'website_click' | 'instagram_click') {
  track('council_interaction', {
    member: memberName,
    action
  });
}

// Track video interactions
export function trackVideoEvent(event: 'play' | 'pause' | 'error', videoName: string) {
  track('video_interaction', {
    event,
    video: videoName
  });
}
