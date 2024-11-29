# Rockets Section Documentation

## Overview

The Rockets section showcases various space vehicles, their specifications, and launch history. This implementation follows the same glass morphism design system while adapting to the unique requirements of displaying rocket information.

## Components Structure

### List Page (`/rockets/page.js`)

#### Grid Layout
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
```
- Responsive breakpoints optimized for rocket imagery:
  - Mobile: 1 column (full width for detailed images)
  - Medium screens: 2 columns
  - Large screens: 3 columns

#### Rocket Card
```jsx
<Link className="glass-card group hover:scale-[1.02] transition-transform duration-200">
  {/* Image Container */}
  <div className="relative h-96">
    <Image
      className="object-contain"  // Different from astronauts to show full rocket
      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
    />
  </div>
  
  {/* Content */}
  <div className="p-6">
    {/* Name, manufacturer, status */}
    {/* Quick stats */}
  </div>
</Link>
```

Key Design Decisions:
1. Image Display:
   - object-contain for full rocket visibility
   - Taller height (h-96) to accommodate rocket proportions
   - Centered positioning
2. Content Organization:
   - Key specifications prominently displayed
   - Status indicators
   - Quick access to important metrics

### Detail Page (`/rockets/[id]/page.js`)

#### Hero Section
```jsx
<div className="relative h-[60vh] min-h-[600px]">
  {/* Full rocket display */}
  <div className="absolute inset-0">
    <Image className="object-contain" />
  </div>
  
  {/* Information overlay */}
  <div className="absolute bottom-0 bg-gradient-to-t">
    {/* Name, manufacturer, status */}
  </div>
</div>
```

#### Specifications Section
```jsx
<div className="glass-card p-8">
  {/* Technical Details */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <StatCard label="Height" value={rocket.height} unit="m" />
    <StatCard label="Diameter" value={rocket.diameter} unit="m" />
    <StatCard label="Mass" value={rocket.mass} unit="kg" />
    {/* Additional stats */}
  </div>

  {/* Launch History */}
  <div className="mt-8">
    <Timeline launches={rocket.launches} />
  </div>
</div>
```

## Data Structures

### Rocket Type Definition
```typescript
interface Rocket {
  id: string;
  name: string;
  manufacturer: string;
  status: {
    name: string;
    abbrev: string;
  };
  specifications: {
    height: number;
    diameter: number;
    mass: number;
    // Additional specs
  };
  launches: Launch[];
}
```

### Data Fetching
```javascript
// useRockets.js
export function useRockets(params) {
  return useQuery({
    queryKey: ['rockets', params],
    queryFn: () => fetchRockets(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}
```

## Styling Guidelines

### Rocket-Specific Components

#### StatCard Component
```jsx
function StatCard({ label, value, unit }) {
  return (
    <div className="glass-card-secondary p-4">
      <div className="text-sm text-gray-400">{label}</div>
      <div className="text-2xl font-bold text-white">
        {value} <span className="text-sm text-gray-300">{unit}</span>
      </div>
    </div>
  );
}
```

#### Timeline Component
```jsx
function Timeline({ launches }) {
  return (
    <div className="space-y-4">
      {launches.map(launch => (
        <div className="glass-card-secondary p-4 flex items-center">
          <div className="w-24 text-gray-400">
            {formatDate(launch.date)}
          </div>
          <div className="flex-grow">
            {launch.mission}
          </div>
          <StatusBadge status={launch.status} />
        </div>
      ))}
    </div>
  );
}
```

## Interactive Features

### 3D Model Viewer (Future Enhancement)
```jsx
function RocketModelViewer({ modelUrl }) {
  return (
    <div className="relative h-[80vh]">
      <Canvas>
        <Model url={modelUrl} />
        <OrbitControls />
        <ambientLight />
      </Canvas>
    </div>
  );
}
```

### Launch Animation
```jsx
function LaunchAnimation({ isVisible }) {
  return (
    <div className={`
      transform transition-transform duration-1000
      ${isVisible ? 'translate-y-0' : 'translate-y-full'}
    `}>
      {/* Animation content */}
    </div>
  );
}
```

## Performance Optimizations

1. Image Loading Strategy:
```jsx
<Image
  src={rocket.imageUrl}
  priority={isHero}
  loading={isHero ? 'eager' : 'lazy'}
  quality={isHero ? 100 : 75}
/>
```

2. Data Prefetching:
```javascript
// Prefetch next page of rockets
const prefetchNextPage = async () => {
  await queryClient.prefetchQuery({
    queryKey: ['rockets', { page: currentPage + 1 }],
    queryFn: () => fetchRockets({ page: currentPage + 1 })
  })
}
```

3. Component Code-Splitting:
```javascript
const RocketModelViewer = dynamic(() => import('./RocketModelViewer'), {
  loading: () => <LoadingSpinner />,
  ssr: false
})
```

## Accessibility Features

1. Keyboard Navigation:
```jsx
function RocketControls() {
  return (
    <div role="toolbar" aria-label="Rocket view controls">
      <button
        aria-label="Rotate left"
        onKeyDown={handleKeyDown}
      >
        {/* Control content */}
      </button>
    </div>
  );
}
```

2. Screen Reader Information:
```jsx
<div aria-live="polite" aria-atomic="true">
  {`${rocket.name} specifications: Height ${rocket.height} meters`}
</div>
```

## Testing Scenarios

1. Component Tests:
```javascript
describe('RocketCard', () => {
  it('displays correct specifications', () => {
    render(<RocketCard rocket={mockRocket} />);
    expect(screen.getByText(mockRocket.height)).toBeInTheDocument();
  });

  it('handles missing data gracefully', () => {
    const incompleteRocket = { ...mockRocket, height: null };
    render(<RocketCard rocket={incompleteRocket} />);
    expect(screen.getByText('N/A')).toBeInTheDocument();
  });
});
```

2. Integration Tests:
```javascript
describe('Rocket Detail Page', () => {
  it('loads and displays rocket data', async () => {
    render(<RocketDetailPage params={{ id: 'falcon9' }} />);
    await waitFor(() => {
      expect(screen.getByText('Falcon 9')).toBeInTheDocument();
    });
  });
});
```

## Future Enhancements

1. Technical Features:
   - 3D model viewing
   - Launch simulation
   - Real-time launch tracking
   - Compare rockets feature

2. Content Enhancements:
   - Detailed launch history
   - Technical specifications
   - Success rate statistics
   - Cost analysis

3. Interactive Features:
   - Virtual tours
   - AR visualization
   - Launch countdown timers
   - Social sharing
