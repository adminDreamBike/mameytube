# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MameyTube is a YouTube-like video browsing application built with Next.js 14 (App Router), integrating the YouTube Data API v3. It features server-side rendering for initial video loads, client-side state management, and a responsive UI with both Chakra UI and NextUI components.

## Development Commands

```bash
# Development
npm run dev          # Start development server on http://localhost:3000

# Build & Production
npm run build        # Create production build
npm start            # Start production server

# Linting
npm run lint         # Run ESLint checks
```

## Environment Configuration

Required environment variable:
- `NEXT_PUBLIC_YOUTUBE_API_KEY`: YouTube Data API v3 key (set in `.env.local`)

The API client is configured in `src/lib/api/apiClient.ts` with base URL `https://www.googleapis.com/youtube/v3`.

## Architecture

### App Router Structure (Next.js 14)

- **`src/app/page.tsx`**: Homepage with SSR - fetches initial videos via `getVideo()` with `revalidate: 3000` for ISR
- **`src/app/video/[id]/page.tsx`**: Individual video player page (dynamic route)
- **`src/app/results/page.tsx`**: Search results page
- **`src/app/layout.tsx`**: Root layout with provider hierarchy (see below)

### Provider Hierarchy

The app wraps components in this order (outer to inner):
1. `ReactQueryProvider` - TanStack Query for server state
2. `HydrationBoundary` - React Query hydration
3. `ChakraUIProvider` - Chakra UI theming
4. Client components: `Header`, `SideBar`, `ThemeSwitcher`, `ReactQueryDevtools`

### State Management

**Zustand Store** (`src/stores/videos.ts`):
- Manages video data with localStorage persistence
- Category filtering logic
- Key exports: `useFilteredVideos`, `useSelectedCategoryId`, `useVideoActions`, `useVideoById`
- Uses `skipHydration: true` to avoid SSR/client mismatches

**TanStack Query** (`src/lib/queries/video.ts`):
- `useVideos`: Fetches most popular videos or searches
- `useSearchVideos`: Search-specific queries
- Initial data passed from SSR to avoid refetching

### Data Flow

1. **Initial Load**: Server fetches videos in `page.tsx` → passed as `initialData` to React Query
2. **Client Hydration**: Zustand store hydrates from localStorage
3. **Search/Filter**: React Query handles API calls → Zustand manages filtered state
4. **Video Details**: Dynamic route pulls from Zustand store or API if missing

### API Layer

**`src/lib/api/`**:
- `apiClient.ts`: Axios instance with YouTube API base URL and key injection
- `video.ts`:
  - `getVideo()`: Fetches most popular videos (uses `/videos` endpoint with `chart=mostPopular`)
  - `searchVideos()`: Searches videos (uses `/search` endpoint)
- `channel.ts`: Channel-related API calls

### Component Architecture

**Key Components**:
- `VideoGrid`: Displays video cards in grid layout, integrates with React Query
- `VideoCard`: Individual video preview
- `VideoPlayer`: Native HTML5 video player with Video.js
- `IframeVideoPlayer`: Fallback iframe player
- `SearchInput`: Search functionality
- `Filter`: Category filtering UI
- `Header`: Top navigation with sidebar toggle
- `SideBar`: Navigation drawer (Chakra UI)

### Styling

- **Tailwind CSS**: Primary utility framework (`tailwind.config.ts`, `postcss.config.mjs`)
- **Chakra UI**: UI components and theming
- **NextUI**: Additional component library
- **Styled Components**: Some components use `.styled.tsx` files
- **CSS Modules**: Global styles in `src/app/globals.css`
- Custom fonts via `src/app/fonts.ts` (Rubik font family)

### TypeScript Configuration

- Path aliases: `@/*` → `./src/*`, `@/types/*` → `./src/types/*`
- Strict mode enabled
- Module resolution: `bundler`

## Key Architectural Patterns

1. **Hybrid Rendering**: SSR for initial load, client-side for interactivity
2. **State Colocation**: Server state (React Query) + Client state (Zustand) separation
3. **Type Safety**: Comprehensive types in `src/lib/types.ts` and `src/types/video.ts`
4. **API Abstraction**: Axios client with centralized configuration
5. **Component Composition**: Multiple UI libraries coexist (Chakra + NextUI + Tailwind)

## Coding Style

- **Comments**: Use comments sparingly. Only comment complex code where the logic isn't self-evident. Prefer self-documenting code with clear variable and function names.

## Important Notes

- Video IDs can be string or object (`{kind, videoId}`) - use `getVideoId()` utility from `src/lib/utils/utils.ts`
- Zustand store hydration must complete before accessing localStorage data
- React Query devtools available in development via `ReactQueryDevtools`
- ESLint configured with Next.js TypeScript rules
