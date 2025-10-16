# Analytics Implementation Guide

## Overview

The WMG website includes a comprehensive custom analytics tracking system designed to provide deep insights into user behavior and site performance.

## Features

### 🎯 Event Tracking
- **Button Clicks**: Hero CTA, form submissions, external links
- **Form Interactions**: Start, submit, error states with detailed metadata
- **Media Interactions**: Audio play/pause, video events
- **Navigation**: Section views, scroll depth, page visibility
- **User Engagement**: Council member interactions, gathering interest

### 📊 Performance Monitoring
- Page load times
- JavaScript errors
- Unhandled promise rejections
- Connection type detection

### 🔍 User Behavior Analysis
- Scroll depth tracking (25%, 50%, 75%, 100%)
- Section view tracking with intersection observer
- Form abandonment analysis
- Audio engagement patterns

## Implementation

### Core Files
- `src/lib/analytics.ts` - Main tracking utilities and event functions
- `src/lib/pageAnalytics.ts` - Page-level analytics initialization
- Component-specific tracking in Hero, SignupForm, InnerCouncil, AudioToggle

### Event Categories
```typescript
const AnalyticsEvents = {
  NAVIGATION: 'navigation',
  ENGAGEMENT: 'engagement', 
  CONVERSION: 'conversion',
  AUDIO: 'audio',
  FORM: 'form'
}
```

### Tracked Events
- `button_click` - Button interactions with location context
- `form_interaction` - Form lifecycle events (start, submit, error)
- `audio_interaction` - Audio play/pause/toggle events
- `video_interaction` - Video playback events
- `section_view` - Section visibility tracking
- `scroll_depth` - Scroll percentage milestones
- `council_interaction` - Team member engagement
- `gathering_interaction` - Event interest tracking
- `external_link_click` - Outbound link tracking
- `page_load_time` - Performance metrics
- `javascript_error` - Error tracking
- `page_visibility` - Tab focus/blur events

## Integration Ready

### Vercel Analytics
The system is designed to easily integrate with Vercel Analytics:

```typescript
// In analytics.ts - ready to uncomment when Vercel Analytics is configured
// trackVercel(eventName, properties);
```

### Google Analytics 4
Compatible with gtag implementation:

```typescript
if (typeof window !== 'undefined' && window.gtag) {
  window.gtag('event', eventName, properties);
}
```

### Custom Endpoints
Can be extended to send data to custom analytics endpoints or third-party services.

## Privacy & Performance

### Privacy Conscious
- No personal data collection
- Anonymous user behavior tracking
- Respects user preferences and browser settings

### Performance Optimized
- Intersection Observer for efficient viewport tracking
- Passive event listeners for scroll tracking
- Minimal JavaScript footprint
- Lazy loading of analytics modules

### Development Mode
- Console logging for debugging
- Clear event categorization
- Detailed metadata for analysis

## Usage Examples

### Track Button Click
```typescript
trackButtonClick('join_gathering', 'hero');
```

### Track Form Event
```typescript
trackFormEvent('submit', 'signup_form', { 
  has_name: true, 
  has_email: true 
});
```

### Track Audio Interaction
```typescript
trackAudioEvent('play', 'background_music');
```

### Track Section View
```typescript
trackSectionView('Inner Council');
```

## Analytics Dashboard

When integrated with Vercel Analytics or Google Analytics, you'll be able to track:

1. **Conversion Funnel**: Hero → WhatIs → Schedule → Signup
2. **Engagement Metrics**: Scroll depth, time on page, section views
3. **Media Usage**: Audio play rates, video engagement
4. **Form Performance**: Completion rates, error patterns
5. **User Journey**: Navigation patterns, exit points
6. **Technical Performance**: Load times, error rates

## Future Enhancements

- A/B testing integration
- User session recording
- Heatmap integration
- Conversion attribution
- Cohort analysis
- Real-time analytics dashboard
