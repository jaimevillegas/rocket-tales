# Rocket Tales Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Getting Started](#getting-started)
3. [Project Structure](#project-structure)
4. [Tech Stack](#tech-stack)
5. [Design System](#design-system)
6. [Components](#components)
7. [Pages](#pages)
8. [Data Fetching](#data-fetching)
9. [Styling](#styling)
10. [Best Practices](#best-practices)

## Project Overview

Rocket Tales is a modern web application that showcases space exploration data, including information about astronauts, missions, rockets, and space stations. The project serves as a comprehensive guide for developers interested in building modern, responsive web applications using Next.js and Tailwind CSS.

### Key Features
- Responsive design with glass morphism aesthetic
- Dynamic data fetching with React Query
- Image optimization with Next.js Image component
- Dark mode support
- Interactive UI elements
- Consistent design system

## Getting Started

```bash
# Clone the repository
git clone [repository-url]

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
rocket-tales/
├── src/
│   ├── app/                    # Next.js 13+ App Router
│   │   ├── (public)/          # Public routes
│   │   │   ├── astronauts/    # Astronauts section
│   │   │   ├── missions/      # Missions section
│   │   │   ├── rockets/       # Rockets section
│   │   │   └── ...
│   ├── components/            # Reusable components
│   ├── hooks/                 # Custom React hooks
│   ├── context/              # React context providers
│   ├── utils/                # Utility functions
│   └── styles/               # Global styles
├── public/                   # Static assets
└── docs/                    # Documentation
```

## Tech Stack

### Core Technologies
- **Next.js 15.0.3**: React framework for production
- **React 19.0.0**: UI library
- **Tailwind CSS 3.4.1**: Utility-first CSS framework

### Key Dependencies
- **@tanstack/react-query**: Data fetching and caching
- **next-themes**: Dark mode support
- **@heroicons/react**: Icon library
- **SWR**: Data fetching (alternative to React Query)

## Design System

### Glass Morphism Theme
The project implements a consistent glass morphism design system with the following characteristics:

#### Base Classes
```css
.glass-card {
  /* Semi-transparent background */
  background: rgba(255, 255, 255, 0.1);
  /* Blur effect */
  backdrop-filter: blur(10px);
  /* Border */
  border: 1px solid rgba(255, 255, 255, 0.2);
  /* Rounded corners */
  border-radius: 0.5rem;
}

.glass-button {
  /* Similar to glass-card with hover states */
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.2s;
}
```

### Color Palette
- Primary: Blue shades for interactive elements
- Secondary: Purple accents
- Text: White/Gray scale for content
- Status Colors: Green (active), Gray (retired), Blue (other)

## Components

### Core Components

#### Navbar (`components/Navbar.js`)
Navigation component with responsive design and glass morphism effect.
```jsx
// Key features:
- Responsive mobile/desktop layout
- Active page highlighting
- Smooth transitions
- Logo with gradient effect
```

#### ImageModal (`components/ImageModal.js`)
Modal component for displaying full-size images.
```jsx
// Features:
- Zoom functionality
- Click outside to close
- Keyboard accessibility
- Loading states
```

#### LoadingSpinner (`components/LoadingSpinner.js`)
Consistent loading state component.
```jsx
// Usage:
<LoadingSpinner message="Optional loading message" />
```

### Page-Specific Components

#### Astronaut Cards
```jsx
// Features:
- Portrait image optimization
- Status badges
- Hover effects
- Responsive grid layout
```

## Pages

### Astronauts Section

#### List Page (`/astronauts/page.js`)
```jsx
// Features:
- 4-column responsive grid
- Status filtering
- Pagination
- Portrait-optimized cards
```

Key Design Decisions:
- Grid layout: 1/2/3/4 columns based on screen size
- Card height: 72px for optimal portrait display
- Image positioning: object-top for better face visibility
- Status badges with semantic colors

#### Detail Page (`/astronauts/[id]/page.js`)
```jsx
// Features:
- Large hero image
- Bio section
- Stats grid
- Agency information
```

Key Design Decisions:
- Hero section: 40vh height with min-height 400px
- Gradient overlays for text readability
- Semantic organization of information
- Interactive image zoom

## Data Fetching

### Custom Hooks

#### useAstronauts
```javascript
// Features:
- Pagination support
- Error handling
- Loading states
- Data caching
```

## Styling

### Tailwind Configuration
```javascript
// tailwind.config.js
module.exports = {
  // Custom configuration for glass morphism
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      }
    }
  }
}
```

### CSS Best Practices
1. Use Tailwind utility classes for consistency
2. Implement responsive design using breakpoints
3. Maintain semantic color usage
4. Use CSS variables for theme values

## Best Practices

### Code Organization
1. Group related components together
2. Use consistent file naming conventions
3. Implement proper TypeScript types
4. Maintain clear component hierarchy

### Performance
1. Optimize images using Next.js Image
2. Implement proper loading states
3. Use React Query for data caching
4. Lazy load components when possible

### Accessibility
1. Proper ARIA labels
2. Keyboard navigation support
3. Semantic HTML structure
4. Color contrast compliance

### State Management
1. Use React Query for server state
2. Implement context for theme/global state
3. Keep component state local when possible
4. Handle loading/error states consistently

## Contributing

1. Follow the existing code style
2. Write meaningful commit messages
3. Add proper documentation
4. Test across different devices/browsers

## License

[Add your license information here]
