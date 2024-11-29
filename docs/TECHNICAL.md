# Technical Implementation Documentation

## Architecture Overview

### Project Structure
```
rocket-tales/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.js          # Root layout
│   │   ├── providers.js       # Global providers
│   │   └── (public)/         # Public routes
│   ├── components/            # React components
│   │   ├── common/           # Shared components
│   │   └── features/         # Feature-specific components
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utility functions
│   └── styles/               # Global styles
└── public/                   # Static assets
```

## Core Technologies

### Next.js Configuration
```javascript
// next.config.js
module.exports = {
  images: {
    domains: [
      'images.nasa.gov',
      'cdn.rocketdata.space'
    ],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    serverActions: true,
  },
}
```

### React Query Setup
```javascript
// src/app/providers.js
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})
```

## Data Management

### API Integration
```typescript
// src/lib/api.ts
interface ApiConfig {
  baseUrl: string;
  timeout: number;
  headers: Record<string, string>;
}

class ApiClient {
  private config: ApiConfig;
  
  constructor(config: ApiConfig) {
    this.config = config;
  }

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.config.baseUrl}${endpoint}`, {
      headers: this.config.headers,
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new ApiError(response.statusText);
    }

    return response.json();
  }
}
```

### Data Fetching Hooks
```javascript
// src/hooks/useData.js
export function useData(endpoint, options = {}) {
  const { data, error, isLoading } = useQuery({
    queryKey: [endpoint, options],
    queryFn: () => apiClient.get(endpoint, options),
    ...options,
  });

  return {
    data,
    error,
    isLoading,
    isEmpty: !error && !isLoading && !data,
  };
}
```

## State Management

### Theme Context
```javascript
// src/context/ThemeContext.js
export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark');
  
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

### Navigation State
```javascript
// src/hooks/useNavigation.js
export function useNavigation() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const setQueryParams = useCallback((params) => {
    const url = new URL(window.location.href);
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
    window.history.pushState({}, '', url);
  }, []);

  return {
    pathname,
    searchParams,
    setQueryParams,
  };
}
```

## Component Architecture

### Glass Card System
```javascript
// src/components/common/GlassCard.js
export function GlassCard({ 
  variant = 'primary',
  hover = true,
  children 
}) {
  const variants = {
    primary: 'bg-white/10 backdrop-blur-md',
    secondary: 'bg-white/5 backdrop-blur-sm',
  };

  const hoverClass = hover 
    ? 'hover:scale-[1.02] transition-transform duration-200'
    : '';

  return (
    <div className={`
      ${variants[variant]}
      ${hoverClass}
      border border-white/20 
      rounded-lg
    `}>
      {children}
    </div>
  );
}
```

### Image Optimization
```javascript
// src/components/common/OptimizedImage.js
export function OptimizedImage({
  src,
  alt,
  priority = false,
  className,
  ...props
}) {
  return (
    <Image
      src={src}
      alt={alt}
      priority={priority}
      quality={priority ? 100 : 75}
      loading={priority ? 'eager' : 'lazy'}
      className={cn(
        'transition-opacity duration-300',
        className
      )}
      onLoad={(e) => {
        e.target.classList.remove('opacity-0');
      }}
      {...props}
    />
  );
}
```

## Performance Optimizations

### Dynamic Imports
```javascript
// src/components/features/ModelViewer.js
const ModelViewer = dynamic(() => import('./ModelViewer'), {
  loading: () => <LoadingSpinner />,
  ssr: false,
});
```

### Image Loading Strategy
```javascript
// src/hooks/useImageLoading.js
export function useImageLoading(src) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setIsLoading(false);
    img.onerror = () => setError('Failed to load image');
  }, [src]);

  return { isLoading, error };
}
```

### Route Prefetching
```javascript
// src/components/common/Link.js
export function Link({ href, children, prefetch = true }) {
  const router = useRouter();
  
  useEffect(() => {
    if (prefetch) {
      router.prefetch(href);
    }
  }, [href, prefetch, router]);

  return (
    <NextLink href={href}>
      {children}
    </NextLink>
  );
}
```

## Testing Strategy

### Component Testing
```javascript
// src/components/__tests__/Card.test.js
describe('Card Component', () => {
  it('renders with correct styles', () => {
    const { container } = render(<Card variant="primary" />);
    expect(container.firstChild).toHaveClass('bg-white/10');
  });

  it('applies hover effects when enabled', () => {
    const { container } = render(<Card hover={true} />);
    expect(container.firstChild).toHaveClass('hover:scale-[1.02]');
  });
});
```

### Integration Testing
```javascript
// src/tests/integration/navigation.test.js
describe('Navigation Flow', () => {
  it('navigates between pages correctly', async () => {
    render(<App />);
    
    // Navigate to rockets
    fireEvent.click(screen.getByText('Rockets'));
    await waitFor(() => {
      expect(screen.getByText('Falcon 9')).toBeInTheDocument();
    });

    // Navigate to specific rocket
    fireEvent.click(screen.getByText('Falcon 9'));
    await waitFor(() => {
      expect(screen.getByText('Technical Specifications')).toBeInTheDocument();
    });
  });
});
```

## Error Handling

### API Error Boundary
```javascript
// src/components/common/ErrorBoundary.js
export class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="glass-card p-6">
          <h2 className="text-xl text-red-500">Something went wrong</h2>
          <pre className="mt-4 text-sm">
            {this.state.error.message}
          </pre>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### API Error Handling
```javascript
// src/lib/apiErrors.js
export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }

  static isApiError(error) {
    return error instanceof ApiError;
  }
}

export function handleApiError(error) {
  if (ApiError.isApiError(error)) {
    // Handle API-specific errors
    return {
      message: error.message,
      status: error.status,
    };
  }

  // Handle generic errors
  return {
    message: 'An unexpected error occurred',
    status: 500,
  };
}
```

## Security Considerations

### CSP Configuration
```javascript
// next.config.js
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      img-src 'self' https://images.nasa.gov https://cdn.rocketdata.space;
      script-src 'self' 'unsafe-eval' 'unsafe-inline';
      style-src 'self' 'unsafe-inline';
    `
  }
];

module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};
```

### Authentication Flow
```javascript
// src/lib/auth.js
export async function authenticate(credentials) {
  try {
    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Authentication failed');
    }

    const { token } = await response.json();
    
    // Store token securely
    sessionStorage.setItem('token', token);
    
    return token;
  } catch (error) {
    console.error('Authentication error:', error);
    throw error;
  }
}
```

## Deployment Configuration

### Production Optimizations
```javascript
// next.config.js
module.exports = {
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  
  webpack: (config, { dev, isServer }) => {
    // Optimize production build
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 244000,
      };
    }
    return config;
  },
};
```

### Environment Variables
```javascript
// src/lib/config.js
export const config = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    timeout: parseInt(process.env.API_TIMEOUT || '5000'),
  },
  features: {
    enableExperimental: process.env.ENABLE_EXPERIMENTAL === 'true',
  },
  sentry: {
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV,
  },
};
```
