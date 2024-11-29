# Astronauts Section Documentation

## Overview

The Astronauts section of Rocket Tales provides a comprehensive view of astronauts' information, including their biographical data, missions, and current status. This document details the implementation decisions and features of the astronauts pages.

## Components Structure

### List Page (`/astronauts/page.js`)

#### Grid Layout
```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
```
- Responsive breakpoints:
  - Mobile: 1 column
  - Small screens (sm): 2 columns
  - Large screens (lg): 3 columns
  - Extra large screens (xl): 4 columns

#### Astronaut Card
```jsx
<Link className="glass-card group hover:scale-[1.02] transition-transform duration-200 flex flex-col">
  {/* Image Container */}
  <div className="relative h-72">
    <Image
      className="object-cover object-top"
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
    />
  </div>
  
  {/* Content */}
  <div className="p-6 flex flex-col flex-grow">
    {/* Name, Status, Bio */}
  </div>
</Link>
```

Key Features:
1. Hover Effect: Subtle scale transform
2. Image Display:
   - Height: 72px for consistent portrait display
   - Position: object-top for face focus
   - Responsive sizing
3. Content Organization:
   - Flexible height with flex-grow
   - Consistent padding
   - Status badges

### Detail Page (`/astronauts/[id]/page.js`)

#### Hero Section
```jsx
<div className="relative h-[40vh] min-h-[400px]">
  {/* Image with zoom capability */}
  <button className="absolute inset-0 w-full h-full group cursor-zoom-in">
    <Image className="object-cover" />
    {/* Gradient overlays */}
  </button>
  
  {/* Information overlay */}
  <div className="absolute bottom-0 bg-gradient-to-t from-black/90">
    {/* Name, status, nationality */}
  </div>
</div>
```

Design Decisions:
1. Image Display:
   - 40vh height with 400px minimum
   - Full-width coverage
   - Gradient overlay for text readability
2. Interactive Features:
   - Click to zoom
   - Hover effects
   - Smooth transitions

#### Content Sections
```jsx
{/* Biography */}
<div className="mb-8">
  <h2 className="text-2xl font-semibold text-white mb-4 text-glow">
  <p className="text-gray-300 leading-relaxed">
</div>

{/* Agency Information */}
<div className="glass-card-secondary p-6 mb-8">
  {/* Agency details */}
</div>

{/* Statistics Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Stats cards */}
</div>
```

Content Organization:
1. Clear hierarchy with consistent spacing
2. Secondary glass cards for subsections
3. Responsive statistics grid
4. Semantic HTML structure

## Data Management

### Data Fetching
```javascript
// useAstronauts.js
export function useAstronauts(limit, offset) {
  return useQuery({
    queryKey: ['astronauts', limit, offset],
    queryFn: () => fetchAstronauts(limit, offset)
  })
}
```

Features:
1. Pagination support
2. Automatic caching
3. Loading states
4. Error handling

### Data Display
```javascript
// Handling complex data
const displayNationality = (nationality) => {
  if (typeof nationality === 'object') {
    return nationality.nationality_name || nationality.name
  }
  return nationality
}
```

## Styling Guidelines

### Glass Card Design
```css
/* Base glass card */
.glass-card {
  @apply bg-white/10 backdrop-blur-md border border-white/20 rounded-lg;
}

/* Secondary glass card */
.glass-card-secondary {
  @apply bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg;
}
```

### Typography
```css
/* Headings */
.text-glow {
  @apply text-white drop-shadow-lg;
}

/* Body text */
.text-body {
  @apply text-gray-300 leading-relaxed;
}
```

### Interactive Elements
```css
/* Buttons and links */
.glass-button {
  @apply px-4 py-2 bg-white/10 hover:bg-blue-500/20 
         transition-colors duration-200;
}
```

## Accessibility Considerations

1. Semantic HTML:
   ```html
   <h1> for page titles
   <h2> for section headings
   <button> for interactive elements
   ```

2. ARIA attributes:
   ```jsx
   aria-label="View full image"
   aria-expanded={isOpen}
   role="dialog"
   ```

3. Keyboard Navigation:
   - Focus styles
   - Proper tab order
   - Escape key handling

## Performance Optimizations

1. Image Loading:
   ```jsx
   <Image
     priority={isHero}
     sizes="..."
     loading="lazy"
   />
   ```

2. Data Fetching:
   - React Query caching
   - Pagination
   - Loading states

3. Component Optimization:
   - Proper memo usage
   - Efficient re-renders
   - Code splitting

## Testing Considerations

1. Component Testing:
   - Render testing
   - User interaction
   - Loading states
   - Error states

2. Integration Testing:
   - Data fetching
   - Navigation
   - State management

3. Visual Testing:
   - Responsive design
   - Dark mode
   - Image display
   - Animations

## Future Enhancements

1. Features:
   - Advanced filtering
   - Search functionality
   - Timeline view
   - Related astronauts

2. Performance:
   - Image optimization
   - Lazy loading
   - Bundle optimization

3. User Experience:
   - Animations
   - Transitions
   - Interactive elements
