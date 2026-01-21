import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import MockAdapter from 'axios-mock-adapter'
import apiClient from '@/lib/api/apiClient'
import { useVideos, useSearchVideos } from '@/lib/queries/video'
import { ReactNode } from 'react'

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

describe('Video Queries', () => {
  let mock: MockAdapter

  beforeEach(() => {
    mock = new MockAdapter(apiClient)
  })

  afterEach(() => {
    mock.restore()
  })

  describe('useVideos', () => {
    it('should fetch videos successfully', async () => {
      const mockResponse = {
        kind: 'youtube#videoListResponse',
        items: [
          {
            id: 'video1',
            snippet: { title: 'Test Video' },
            statistics: { viewCount: '1000' },
          },
        ],
      }

      mock.onGet('/videos').reply(200, mockResponse)

      const { result } = renderHook(() => useVideos({ initialVideos: undefined }), {
        wrapper: createWrapper(),
      })

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(result.current.videos?.data).toEqual(mockResponse)
      expect(result.current.isLoading).toBe(false)
      expect(result.current.isError).toBe(false)
    })

    it('should use initial videos data', () => {
      const initialData = {
        data: {
          items: [
            {
              id: 'video1',
              snippet: { title: 'Initial Video' },
            },
          ],
        },
      }

      const { result } = renderHook(() => useVideos({ initialVideos: initialData }), {
        wrapper: createWrapper(),
      })

      expect(result.current.videos).toEqual(initialData)
    })

    it('should handle error when fetching videos', async () => {
      mock.onGet('/videos').reply(500, { error: 'Internal Server Error' })

      const { result } = renderHook(() => useVideos({ initialVideos: undefined }), {
        wrapper: createWrapper(),
      })

      await waitFor(() => expect(result.current.isError).toBe(true))

      expect(result.current.isSuccess).toBe(false)
      expect(result.current.error).toBeDefined()
    })

    it('should fetch videos with search query', async () => {
      const mockResponse = {
        kind: 'youtube#videoListResponse',
        items: [
          {
            id: 'video1',
            snippet: { title: 'Search Result' },
          },
        ],
      }

      mock.onGet('/videos').reply(200, mockResponse)

      const { result } = renderHook(
        () => useVideos({ q: 'test query', initialVideos: undefined }),
        {
          wrapper: createWrapper(),
        }
      )

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(result.current.videos?.data).toEqual(mockResponse)
      expect(mock.history.get[0].params.q).toBe('test query')
    })

    it('should show loading state while fetching', () => {
      mock.onGet('/videos').reply(
        () => new Promise(resolve => setTimeout(() => resolve([200, { items: [] }]), 100))
      )

      const { result } = renderHook(() => useVideos({ initialVideos: undefined }), {
        wrapper: createWrapper(),
      })

      expect(result.current.isLoading).toBe(true)
    })

    it('should cache query results by query key', async () => {
      const mockResponse = {
        kind: 'youtube#videoListResponse',
        items: [{ id: 'video1' }],
      }

      mock.onGet('/videos').reply(200, mockResponse)

      const wrapper = createWrapper()

      const { result: result1 } = renderHook(() => useVideos({ q: 'query1', initialVideos: undefined }), {
        wrapper,
      })

      await waitFor(() => expect(result1.current.isSuccess).toBe(true))

      const { result: result2 } = renderHook(() => useVideos({ q: 'query1', initialVideos: undefined }), {
        wrapper,
      })

      expect(result2.current.videos).toBeDefined()
    })
  })

  describe('useSearchVideos', () => {
    it('should search videos successfully', async () => {
      const mockResponse = {
        kind: 'youtube#searchListResponse',
        items: [
          {
            id: { videoId: 'video1' },
            snippet: { title: 'Search Result' },
          },
        ],
      }

      mock.onGet('/search').reply(200, mockResponse)

      const { result } = renderHook(() => useSearchVideos({ q: 'test query' }), {
        wrapper: createWrapper(),
      })

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(result.current.videos?.data).toEqual(mockResponse)
      expect(result.current.isLoading).toBe(false)
      expect(result.current.isError).toBe(false)
    })

    it('should handle error when searching videos', async () => {
      mock.onGet('/search').reply(403, { error: 'Forbidden' })

      const { result } = renderHook(() => useSearchVideos({ q: 'test' }), {
        wrapper: createWrapper(),
      })

      await waitFor(() => expect(result.current.isError).toBe(true))

      expect(result.current.isSuccess).toBe(false)
      expect(result.current.error).toBeDefined()
    })

    it('should search without query parameter', async () => {
      const mockResponse = {
        kind: 'youtube#searchListResponse',
        items: [],
      }

      mock.onGet('/search').reply(200, mockResponse)

      const { result } = renderHook(() => useSearchVideos({}), {
        wrapper: createWrapper(),
      })

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(result.current.videos?.data).toEqual(mockResponse)
    })

    it('should show loading state while searching', () => {
      mock.onGet('/search').reply(
        () => new Promise(resolve => setTimeout(() => resolve([200, { items: [] }]), 100))
      )

      const { result } = renderHook(() => useSearchVideos({ q: 'test' }), {
        wrapper: createWrapper(),
      })

      expect(result.current.isLoading).toBe(true)
    })

    it('should handle network error', async () => {
      mock.onGet('/search').networkError()

      const { result } = renderHook(() => useSearchVideos({ q: 'test' }), {
        wrapper: createWrapper(),
      })

      await waitFor(() => expect(result.current.isError).toBe(true))

      expect(result.current.isSuccess).toBe(false)
    })
  })
})
