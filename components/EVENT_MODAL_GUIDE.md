# EventModal Component Guide

## Overview

The `EventModal` is a pixel-perfect, production-ready modal component that displays event details with professor information, event schedule, key takeaways, modules timeline, and calendar integration options. It's fully responsive and matches the Columbia Business School event design exactly.

## Installation

The component is located at `components/EventModal.jsx` and uses Tailwind CSS for styling.

## Basic Usage

```jsx
import { useState } from 'react';
import EventModal from '@/components/EventModal';

export default function Page() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const event = {
    professorName: "Prof. Oded Netzer",
    professorTitle: "Leadership Intelligence in an AI Era: Developing Quantitative Intuition",
    professorImage: "/path/to/professor-image.jpg",
    date: "2nd August",
    location: "Tata Classroom - Taj Lands End, Mumbai",
    keyTakeaways: [
      "Takeaway 1",
      "Takeaway 2",
      "Takeaway 3"
    ],
    modules: [
      {
        type: "module",
        title: "Module 1: Title",
        time: "10:30 AM-12 PM",
        description: "Description of the module"
      },
      {
        type: "break",
        label: "COFFEE BREAK",
        time: "12 PM - 12:15 PM"
      }
    ],
    onGoogleCalendar: () => { /* handle action */ },
    onOutlook: () => { /* handle action */ },
    onAppleCalendar: () => { /* handle action */ },
    onRegister: () => { /* handle action */ }
  };

  return (
    <>
      <button onClick={() => setSelectedEvent(event)}>
        View Event
      </button>
      <EventModal 
        event={selectedEvent} 
        onClose={() => setSelectedEvent(null)} 
      />
    </>
  );
}
```

## Props

### `event` (object | null)
The event data to display in the modal. When `null`, the modal is hidden. If provided, should contain:

**Required fields:**
- `professorName` (string): Name of the professor/speaker
- `professorTitle` (string): Title or topic of the event
- `date` (string): Event date (e.g., "2nd August")
- `location` (string): Event location
- `keyTakeaways` (array): Array of 2-3 key takeaway strings
- `modules` (array): Array of module/break objects

**Optional fields:**
- `professorImage` (string): URL to professor's profile image

### `onClose` (function)
Callback function triggered when the modal close button is clicked.

## Event Object Structure

```typescript
interface Event {
  professorName: string;
  professorTitle: string;
  professorImage?: string;
  date: string;
  location: string;
  keyTakeaways: string[];
  modules: Module[];
  onGoogleCalendar?: () => void;
  onOutlook?: () => void;
  onAppleCalendar?: () => void;
  onRegister?: () => void;
}

interface Module {
  type: "module" | "break";
  title?: string;           // Required for "module" type
  description?: string;     // Optional for "module" type
  time: string;
  label?: string;          // For "break" type (e.g., "COFFEE BREAK")
}
```

## Example with Full Configuration

```jsx
const event = {
  professorName: "Prof. John Smith",
  professorTitle: "Advanced Data Science: Practical Applications",
  professorImage: "/images/professor-john.jpg",
  date: "15th September",
  location: "Tech Hall, San Francisco",
  keyTakeaways: [
    "Learn cutting-edge machine learning techniques for production systems",
    "Understand how to deploy models at scale with optimal performance",
    "Discover best practices for data validation and model monitoring"
  ],
  modules: [
    {
      type: "module",
      title: "Module 1: ML Fundamentals Review",
      time: "9:00 AM - 10:30 AM",
      description: "Quick refresher on core ML concepts and math"
    },
    {
      type: "break",
      label: "COFFEE BREAK",
      time: "10:30 AM - 10:45 AM"
    },
    {
      type: "module",
      title: "Module 2: Production ML Pipelines",
      time: "10:45 AM - 12:15 PM",
      description: "Building robust, scalable ML systems in production"
    },
    {
      type: "break",
      label: "LUNCH BREAK",
      time: "12:15 PM - 1:00 PM"
    },
    {
      type: "module",
      title: "Module 3: Case Studies & Q&A",
      time: "1:00 PM - 2:30 PM",
      description: "Real-world examples and open discussion"
    }
  ],
  onGoogleCalendar: () => {
    // Implement Google Calendar integration
    window.open('https://calendar.google.com/...');
  },
  onOutlook: () => {
    // Implement Outlook integration
    window.open('https://outlook.office.com/...');
  },
  onAppleCalendar: () => {
    // Implement Apple Calendar integration
    // Can trigger .ics file download
  },
  onRegister: () => {
    // Implement registration flow
    window.location.href = '/register/' + event.id;
  }
};
```

## Features

✅ **Pixel-Perfect Design**: Matches the original design exactly  
✅ **Fully Responsive**: Works on mobile, tablet, and desktop  
✅ **Smooth Interactions**: Hover effects and transitions  
✅ **Accessibility**: Semantic HTML and proper ARIA attributes  
✅ **Modal Overlay**: Background blur with click-outside to close  
✅ **Sticky Header**: Logo and close button stay visible while scrolling  
✅ **Numbered Takeaways**: Visual indicators for key points  
✅ **Calendar Integration**: Quick links to save to popular calendar apps  
✅ **Module Timeline**: Clear visualization of event schedule with breaks  

## Styling Customization

The component uses Tailwind CSS utility classes. To customize colors, spacing, or other styles:

1. **Background Colors**: Update the red colors (currently `red-600`, `red-100`) to match your brand
2. **Typography**: Adjust font sizes and weights if needed
3. **Spacing**: Modify padding and margins using Tailwind utilities
4. **Rounded Corners**: Change `rounded-2xl` and `rounded-lg` values
5. **Shadows**: Adjust `shadow-2xl` for different depth effects

## Performance Considerations

- Component uses `'use client'` directive for client-side interactivity
- Scroll lock is automatically managed via `document.body.style.overflow`
- Modal closes cleanly when `event` prop becomes `null`
- No unnecessary re-renders due to proper state management

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- iOS Safari 14+
- Android Chrome 90+
- Requires JavaScript enabled

## Demo

See `EventModalDemo.jsx` for a working example with sample data that matches the original design image.
