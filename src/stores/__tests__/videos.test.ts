import { renderHook, act } from '@testing-library/react'
import {
  useFilteredVideos,
  useSelectedCategoryId,
  useVideoActions,
  useVideos,
  useChannelIds,
  useVideoById,
} from '@/stores/videos'

const mockVideo = {
  kind: 'youtube#videoListResponse',
  etag: 'test-etag',
  items: [
    {
      kind: 'youtube#video',
      etag: 'item-etag-1',
      id: 'video1',
      snippet: {
        publishedAt: '2024-01-01T00:00:00Z',
        channelId: 'channel1',
        title: 'Test Video 1',
        description: 'Description 1',
        thumbnails: {
          default: { url: 'thumb1.jpg', width: 120, height: 90 },
          medium: { url: 'thumb1_medium.jpg', width: 320, height: 180 },
          high: { url: 'thumb1_high.jpg', width: 480, height: 360 },
        },
        channelTitle: 'Channel 1',
        tags: ['tag1'],
        categoryId: '10',
        liveBroadcastContent: 'none',
        localized: {
          title: 'Test Video 1',
          description: 'Description 1',
        },
        defaultAudioLanguage: 'en',
      },
      contentDetails: {
        duration: 'PT5M30S',
        dimension: '2d',
        definition: 'hd',
        caption: 'false',
        licensedContent: true,
        projection: 'rectangular',
      },
      statistics: {
        viewCount: '1000',
        likeCount: '100',
        favoriteCount: '0',
        commentCount: '10',
      },
    },
    {
      kind: 'youtube#video',
      etag: 'item-etag-2',
      id: 'video2',
      snippet: {
        publishedAt: '2024-01-02T00:00:00Z',
        channelId: 'channel2',
        title: 'Test Video 2',
        description: 'Description 2',
        thumbnails: {
          default: { url: 'thumb2.jpg', width: 120, height: 90 },
          medium: { url: 'thumb2_medium.jpg', width: 320, height: 180 },
          high: { url: 'thumb2_high.jpg', width: 480, height: 360 },
        },
        channelTitle: 'Channel 2',
        tags: ['tag2'],
        categoryId: '20',
        liveBroadcastContent: 'none',
        localized: {
          title: 'Test Video 2',
          description: 'Description 2',
        },
        defaultAudioLanguage: 'en',
      },
      contentDetails: {
        duration: 'PT10M',
        dimension: '2d',
        definition: 'hd',
        caption: 'false',
        licensedContent: true,
        projection: 'rectangular',
      },
      statistics: {
        viewCount: '2000',
        likeCount: '200',
        favoriteCount: '0',
        commentCount: '20',
      },
    },
  ],
  nextPageToken: 'next-token',
  pageInfo: {
    totalResults: 2,
    resultsPerPage: 25,
  },
}

const mockVideoData = {
  data: mockVideo,
}

describe('Video Store', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('useVideoActions', () => {
    it('should set videos', () => {
      const { result } = renderHook(() => useVideoActions())

      act(() => {
        result.current.setVideos(mockVideoData)
      })

      const { result: videosResult } = renderHook(() => useVideos())
      expect(videosResult.current).toEqual(mockVideoData)
    })

    it('should get video by id', () => {
      const { result: actionsResult } = renderHook(() => useVideoActions())

      act(() => {
        actionsResult.current.setVideos(mockVideoData)
      })

      const { result: videosResult } = renderHook(() => useVideos())
      const video = videosResult.current.data?.items?.find((item: typeof mockVideoData.data.items[0]) => item.id === 'video1')

      expect(video?.id).toBe('video1')
      expect(video?.snippet.title).toBe('Test Video 1')
    })

    it('should return undefined for non-existent video id', () => {
      const { result: actionsResult } = renderHook(() => useVideoActions())

      act(() => {
        actionsResult.current.setVideos(mockVideoData)
      })

      const { result: videosResult } = renderHook(() => useVideos())
      const video = videosResult.current.data?.items?.find((item: typeof mockVideoData.data.items[0]) => item.id === 'nonexistent')

      expect(video).toBeUndefined()
    })

    it('should set selected category id', () => {
      const { result } = renderHook(() => useVideoActions())

      act(() => {
        result.current.setSelectedCategoryId('10')
      })

      const { result: categoryResult } = renderHook(() => useSelectedCategoryId())
      expect(categoryResult.current).toBe('10')
    })

    it('should filter videos by category', () => {
      const { result: actionsResult } = renderHook(() => useVideoActions())

      act(() => {
        actionsResult.current.setVideos({ items: mockVideoData.data.items })
      })

      act(() => {
        actionsResult.current.setVideosByCategory('10')
      })

      const { result: filteredResult } = renderHook(() => useFilteredVideos())
      expect(filteredResult.current).toHaveLength(1)
      expect(filteredResult.current[0].id).toBe('video1')
    })

    it('should return all videos when category is "all"', () => {
      const { result: actionsResult } = renderHook(() => useVideoActions())

      act(() => {
        actionsResult.current.setVideos({ items: mockVideoData.data.items, data: mockVideoData.data })
      })

      act(() => {
        actionsResult.current.setVideosByCategory('all')
      })

      const { result: filteredResult } = renderHook(() => useFilteredVideos())
      expect(Array.isArray(filteredResult.current) ? filteredResult.current.length : 0).toBe(2)
    })

    it('should get channel ids from videos', () => {
      const { result: actionsResult } = renderHook(() => useVideoActions())

      act(() => {
        actionsResult.current.setVideos({ items: mockVideoData.data.items })
      })

      act(() => {
        actionsResult.current.getChannelId()
      })

      const { result: channelIdsResult } = renderHook(() => useChannelIds())
      expect(channelIdsResult.current).toBe('channel1,channel2')
    })

    it('should clear filters', () => {
      const { result: actionsResult } = renderHook(() => useVideoActions())

      act(() => {
        actionsResult.current.setVideos({ items: mockVideoData.data.items })
        actionsResult.current.setVideosByCategory('10')
        actionsResult.current.getChannelId()
      })

      act(() => {
        actionsResult.current.clearFilters()
      })

      const { result: categoryResult } = renderHook(() => useSelectedCategoryId())
      const { result: channelIdsResult } = renderHook(() => useChannelIds())

      expect(categoryResult.current).toBe('all')
      expect(channelIdsResult.current).toBe('')
    })
  })

  describe('useVideoById', () => {
    it('should return video by string id', () => {
      const { result: actionsResult } = renderHook(() => useVideoActions())

      act(() => {
        actionsResult.current.setVideos({ items: mockVideoData.data.items })
      })

      const { result } = renderHook(() => useVideoById('video1'))

      expect(result.current?.id).toBe('video1')
      expect(result.current?.snippet.title).toBe('Test Video 1')
    })

    it('should return undefined for non-existent id', () => {
      const { result: actionsResult } = renderHook(() => useVideoActions())

      act(() => {
        actionsResult.current.setVideos({ items: mockVideoData.data.items })
      })

      const { result } = renderHook(() => useVideoById('nonexistent'))

      expect(result.current).toBeUndefined()
    })
  })

  describe('useFilteredVideos', () => {
    it('should return all videos when no category is selected', () => {
      const { result: actionsResult } = renderHook(() => useVideoActions())

      act(() => {
        actionsResult.current.setVideos(mockVideoData)
      })

      const { result } = renderHook(() => useFilteredVideos())

      expect(result.current).toHaveLength(2)
    })

    it('should return filtered videos when category is selected', () => {
      const { result: actionsResult } = renderHook(() => useVideoActions())

      act(() => {
        actionsResult.current.setVideos({ items: mockVideoData.data.items })
        actionsResult.current.setVideosByCategory('10')
      })

      const { result } = renderHook(() => useFilteredVideos())

      expect(result.current).toHaveLength(1)
      expect(result.current[0].snippet.categoryId).toBe('10')
    })
  })
})
