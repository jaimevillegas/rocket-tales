# Missions Section Documentation

## Overview

The Missions section provides detailed information about space missions, including launch details, objectives, and outcomes. This section implements a timeline-based view with rich media integration and real-time updates for ongoing missions.

## Components Structure

### List Page (`/missions/page.js`)

#### Timeline Layout
```jsx
<div className="relative">
  {/* Timeline line */}
  <div className="absolute left-1/2 h-full w-px bg-white/20" />
  
  {/* Mission cards */}
  <div className="space-y-12">
    {missions.map((mission) => (
      <MissionCard
        key={mission.id}
        mission={mission}
        side={index % 2 === 0 ? 'left' : 'right'}
      />
    ))}
  </div>
</div>
```

#### Mission Card Component
```jsx
function MissionCard({ mission, side = 'left' }) {
  return (
    <div className={`
      flex items-center
      ${side === 'left' ? 'flex-row' : 'flex-row-reverse'}
    `}>
      {/* Content */}
      <div className="w-1/2 p-4">
        <GlassCard>
          <div className="p-6">
            <h3 className="text-2xl font-bold">{mission.name}</h3>
            <div className="mt-2 text-gray-400">
              {formatDate(mission.launchDate)}
            </div>
            <StatusBadge status={mission.status} />
            <p className="mt-4">{mission.description}</p>
          </div>
        </GlassCard>
      </div>

      {/* Timeline dot */}
      <div className="w-4 h-4 rounded-full bg-blue-500" />
    </div>
  );
}
```

### Detail Page (`/missions/[id]/page.js`)

#### Hero Section
```jsx
<div className="relative h-[50vh]">
  {/* Background image with parallax */}
  <div 
    className="absolute inset-0 bg-fixed bg-cover bg-center"
    style={{ backgroundImage: `url(${mission.coverImage})` }}
  >
    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />
  </div>

  {/* Mission info */}
  <div className="absolute bottom-0 p-8">
    <h1 className="text-4xl font-bold text-glow">
      {mission.name}
    </h1>
    <div className="mt-4 flex items-center space-x-4">
      <StatusBadge status={mission.status} />
      <div className="text-gray-300">
        {formatDate(mission.launchDate)}
      </div>
    </div>
  </div>
</div>
```

#### Mission Details
```jsx
<div className="container mx-auto px-4 py-8">
  {/* Overview */}
  <section className="glass-card p-8 mb-8">
    <h2 className="text-2xl font-bold mb-4">Mission Overview</h2>
    <p className="text-gray-300 leading-relaxed">
      {mission.description}
    </p>
  </section>

  {/* Key Information Grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <InfoCard
      title="Launch Vehicle"
      value={mission.rocket.name}
      icon={<RocketIcon />}
    />
    <InfoCard
      title="Launch Site"
      value={mission.launchSite}
      icon={<LocationIcon />}
    />
    <InfoCard
      title="Duration"
      value={formatDuration(mission.duration)}
      icon={<ClockIcon />}
    />
  </div>

  {/* Mission Timeline */}
  <section className="mt-12">
    <h2 className="text-2xl font-bold mb-6">Mission Timeline</h2>
    <Timeline events={mission.timeline} />
  </section>
</div>
```

## Data Management

### Mission Type Definition
```typescript
interface Mission {
  id: string;
  name: string;
  description: string;
  status: MissionStatus;
  launchDate: Date;
  duration?: number;
  rocket: {
    id: string;
    name: string;
  };
  launchSite: string;
  timeline: TimelineEvent[];
  crew?: CrewMember[];
  objectives: string[];
  results?: string[];
}

interface TimelineEvent {
  timestamp: Date;
  description: string;
  status: 'completed' | 'in-progress' | 'upcoming';
}
```

### Data Fetching
```javascript
// src/hooks/useMission.js
export function useMission(missionId) {
  return useQuery({
    queryKey: ['mission', missionId],
    queryFn: () => fetchMission(missionId),
    staleTime: 1000 * 60, // 1 minute
  });
}

// Real-time updates for active missions
export function useActiveMissionUpdates(missionId) {
  const { data: mission } = useMission(missionId);
  
  useEffect(() => {
    if (mission?.status === 'in-progress') {
      const ws = new WebSocket(`${WS_URL}/mission/${missionId}`);
      
      ws.onmessage = (event) => {
        const update = JSON.parse(event.data);
        // Handle real-time updates
      };

      return () => ws.close();
    }
  }, [missionId, mission]);
}
```

## Interactive Features

### Mission Timeline Component
```jsx
function Timeline({ events }) {
  return (
    <div className="relative">
      <div className="absolute left-1/2 h-full w-px bg-white/20" />
      
      {events.map((event, index) => (
        <div key={index} className="relative flex items-center mb-8">
          {/* Timeline dot */}
          <div className={`
            absolute left-1/2 w-4 h-4 rounded-full
            transform -translate-x-1/2
            ${getStatusColor(event.status)}
          `} />
          
          {/* Event content */}
          <div className={`
            w-1/2 ${index % 2 === 0 ? 'pr-12' : 'pl-12'}
            ${index % 2 === 0 ? 'text-right' : 'text-left'}
          `}>
            <div className="glass-card-secondary p-4">
              <div className="text-sm text-gray-400">
                {formatDate(event.timestamp)}
              </div>
              <div className="mt-2">
                {event.description}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
```

### Mission Statistics
```jsx
function MissionStats({ stats }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Object.entries(stats).map(([key, value]) => (
        <div key={key} className="glass-card p-4 text-center">
          <div className="text-3xl font-bold">
            {value}
          </div>
          <div className="text-sm text-gray-400 mt-1">
            {key}
          </div>
        </div>
      ))}
    </div>
  );
}
```

## Animations and Transitions

### Launch Countdown
```jsx
function LaunchCountdown({ launchDate }) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(launchDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(launchDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [launchDate]);

  return (
    <div className="flex space-x-4">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="text-center">
          <div className="text-4xl font-bold">
            {value}
          </div>
          <div className="text-sm text-gray-400">
            {unit}
          </div>
        </div>
      ))}
    </div>
  );
}
```

## Performance Optimizations

### Image Loading Strategy
```jsx
function MissionGallery({ images }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {images.map((image, index) => (
        <Image
          key={image.id}
          src={image.url}
          alt={image.description}
          width={400}
          height={300}
          priority={index < 4}
          loading={index < 4 ? 'eager' : 'lazy'}
          className="rounded-lg"
        />
      ))}
    </div>
  );
}
```

### Data Prefetching
```javascript
// Prefetch related missions
export function useRelatedMissions(currentMissionId) {
  const queryClient = useQueryClient();
  
  useEffect(() => {
    const prefetchRelated = async () => {
      const relatedIds = await fetchRelatedMissionIds(currentMissionId);
      
      relatedIds.forEach((id) => {
        queryClient.prefetchQuery({
          queryKey: ['mission', id],
          queryFn: () => fetchMission(id),
        });
      });
    };

    prefetchRelated();
  }, [currentMissionId, queryClient]);
}
```

## Future Enhancements

1. Interactive Features:
   - Mission simulation viewer
   - Live telemetry data
   - Interactive mission control display
   - VR mission experience

2. Content Improvements:
   - Detailed mission objectives
   - Crew profiles integration
   - Historical mission archives
   - Mission comparison tool

3. Technical Enhancements:
   - Real-time mission updates
   - Advanced filtering and search
   - Mission success predictions
   - Social media integration

4. User Experience:
   - Personalized mission alerts
   - Mission calendar integration
   - Share mission highlights
   - Mission achievement badges
