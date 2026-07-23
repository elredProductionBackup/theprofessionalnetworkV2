# Event Modal - Quick Start Guide

## 🎯 What Was Created

A **pixel-perfect Event Modal** component that matches the Columbia Business School design image exactly. Production-ready, fully responsive, zero dependencies beyond React & Tailwind CSS.

---

## 📂 Files at a Glance

| File | Size | Purpose | Read First? |
|------|------|---------|------------|
| **EventModal.jsx** | 12KB | Main component | ✅ No, just use it |
| **EventModalDemo.jsx** | 2.6KB | Working example | ✅ YES - See it live |
| **EventsListWithModal.jsx** | 6.2KB | Full integration | ✅ YES - Copy this pattern |
| **EVENT_MODAL_GUIDE.md** | Component docs | Props & API | If customizing |
| **EVENTMODAL_README.md** | 8.6KB | Implementation guide | If integrating |
| **IMPLEMENTATION_SUMMARY.md** | 9.7KB | Architecture details | For reference |

---

## 🚀 Three Ways to Use It

### Option 1: See It Working (30 seconds)
```jsx
// In any page.js or route
import EventModalDemo from '@/components/EventModalDemo';

export default function Page() {
  return <EventModalDemo />;
}
```
✅ Opens immediately with sample data from the design

---

### Option 2: Use in Your Event Page (2 minutes)
```jsx
'use client';
import { useState } from 'react';
import EventModal from '@/components/EventModal';

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Your event data
  const event = {
    professorName: "Prof. Name",
    professorTitle: "Event Title",
    date: "Date",
    location: "Location",
    keyTakeaways: ["Point 1", "Point 2", "Point 3"],
    modules: [
      {
        type: "module",
        title: "Module Title",
        time: "10:00 AM - 11:00 AM",
        description: "Description"
      }
    ],
    onRegister: () => console.log("Register clicked")
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

---

### Option 3: Full Events List (Copy EventsListWithModal Pattern)
```jsx
// components/MyEventsPage.jsx
import EventsListWithModal from '@/components/EventsListWithModal';

export default function MyEventsPage({ events }) {
  return <EventsListWithModal events={events} />;
}
```
✅ Includes event cards + modal + responsive grid

---

## 🎨 What's Included

### Visual Elements
- ✅ Sticky header with Columbia logo & close button
- ✅ Professor/speaker section with image
- ✅ Event date & location
- ✅ Calendar integration (Google, Outlook, Apple)
- ✅ Numbered key takeaways
- ✅ Complete modules timeline with breaks
- ✅ Register button

### Behavior
- ✅ Smooth open/close animation
- ✅ Click overlay to close
- ✅ Body scroll locked when open
- ✅ Fully responsive (mobile to desktop)
- ✅ Keyboard accessible

---

## 📋 Props Reference

### EventModal
```jsx
<EventModal 
  event={event}              // Event data object or null
  onClose={() => {}}         // Function called when closing
/>
```

### Event Object
```jsx
{
  professorName: "string",           // Required
  professorTitle: "string",          // Required
  professorImage: "url",             // Optional
  date: "string",                    // Required
  location: "string",                // Required
  keyTakeaways: ["str", "str", ...], // Required array
  modules: [{ ... }],                // Required array
  onGoogleCalendar: () => {},        // Optional
  onOutlook: () => {},               // Optional
  onAppleCalendar: () => {},         // Optional
  onRegister: () => {}               // Optional
}
```

### Module Object
```jsx
// For regular module
{
  type: "module",
  title: "Module Title",
  time: "10:00 AM - 11:00 AM",
  description: "Description text"
}

// For break
{
  type: "break",
  label: "COFFEE BREAK",
  time: "11:00 AM - 11:15 AM"
}
```

---

## 🎯 Common Tasks

### Show Modal on Button Click
```jsx
const [event, setEvent] = useState(null);
<button onClick={() => setEvent(eventData)}>View Details</button>
<EventModal event={event} onClose={() => setEvent(null)} />
```

### Handle Registration
```jsx
const eventData = {
  ...otherProps,
  onRegister: () => {
    router.push('/register');
    // or: window.open('https://register.com');
  }
};
```

### Add to Google Calendar
```jsx
const eventData = {
  ...otherProps,
  onGoogleCalendar: () => {
    const url = `https://calendar.google.com/calendar/u/0/r/eventedit?text=${event.professorTitle}`;
    window.open(url);
  }
};
```

### Change Color from Red to Blue
```jsx
// In EventModal.jsx, find and replace:
// red-600 → blue-600
// red-100 → blue-100
// red-700 → blue-700
```

### Adjust Modal Width
```jsx
// In EventModal.jsx, line ~11:
// Change: max-w-[700px]
// To: max-w-2xl (640px) or max-w-4xl (896px)
```

---

## ✅ Testing

### Verify It Works
1. Import `EventModalDemo` into a page
2. Run dev server: `npm run dev`
3. Visit that page
4. Click button to open modal
5. Check all buttons work
6. Close modal

### Test on Mobile
1. Open dev tools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Test on 375px width
4. Verify layout is correct
5. Verify buttons are clickable

### Test Responsiveness
- Mobile (375px): ✅
- Tablet (768px): ✅
- Desktop (1200px+): ✅

---

## 🔧 Customization Checklist

| Need | File | Change |
|------|------|--------|
| Change colors | EventModal.jsx | red-600 → your-color |
| Wider modal | EventModal.jsx | max-w-[700px] → max-w-2xl |
| More padding | EventModal.jsx | px-6 md:px-8 → px-8 md:px-12 |
| Different fonts | globals.css | Update font-inter |
| Add animations | globals.css | Add @keyframes |

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Modal won't open | Check `event` prop is not null |
| Styling looks wrong | Verify Tailwind CSS is working |
| Scroll not working | Ensure content height > viewport |
| Buttons don't work | Implement the callback functions |
| Layout broken on mobile | Check max-h and overflow settings |

---

## 📚 Need More Help?

| Want to... | Read This |
|-----------|-----------|
| See it working | → **EventModalDemo.jsx** |
| Copy a real example | → **EventsListWithModal.jsx** |
| Understand all props | → **EVENT_MODAL_GUIDE.md** |
| Implementation details | → **EVENTMODAL_README.md** |
| Full architecture | → **IMPLEMENTATION_SUMMARY.md** |

---

## 🎬 Get Started in 30 Seconds

**Step 1:** Open any page in your app  
**Step 2:** Add this:
```jsx
import EventModalDemo from '@/components/EventModalDemo';
export default function Page() {
  return <EventModalDemo />;
}
```
**Step 3:** Run `npm run dev`  
**Step 4:** See it working!

---

## ✨ What You Get

- ✅ 100% pixel-perfect match to design
- ✅ Fully responsive (mobile to desktop)
- ✅ Production-ready code
- ✅ Zero dependencies
- ✅ Complete documentation
- ✅ Working examples
- ✅ Easy customization

---

**That's it!** Start with EventModalDemo.jsx to see it in action.
