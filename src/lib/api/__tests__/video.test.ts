import MockAdapter from 'axios-mock-adapter'
import apiClient from '@/lib/api/apiClient'
import { getVideo, searchVideos } from '@/lib/api/video'

describe('Video API', () => {
  let mock: MockAdapter

  beforeEach(() => {
    mock = new MockAdapter(apiClient)
  })

  afterEach(() => {
    mock.restore()
  })

  describe('getVideo', () => {
    it('should fetch most popular videos without query', async () => {
      const mockResponse = {
        kind: 'youtube#videoListResponse',
        items: [
          {
            id: 'video1',
            snippet: { title: 'Test Video' },
            statistics: { viewCount: '1000' },
            contentDetails: { duration: 'PT5M30S' },
          },
        ],
      }

      mock.onGet('/videos').reply(200, mockResponse)

      const response = await getVideo({ type: 'video' })

      expect(response.status).toBe(200)
      expect(response.data).toEqual(mockResponse)
      expect(mock.history.get[0].params).toMatchObject({
        part: 'id, statistics, snippet, contentDetails',
        chart: 'mostPopular',
        maxResults: 25,
        type: 'video',
      })
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

      const response = await getVideo({ q: 'test query', type: 'video' })

      expect(response.status).toBe(200)
      expect(response.data).toEqual(mockResponse)
      expect(mock.history.get[0].params).toMatchObject({
        part: 'snippet',
        chart: 'mostPopular',
        maxResults: 25,
        q: 'test query',
        type: 'video',
      })
    })

    it('should use default type "video" when not specified', async () => {
      const mockResponse = { items: [] }
      mock.onGet('/videos').reply(200, mockResponse)

      await getVideo({})

      expect(mock.history.get[0].params.type).toBe('video')
    })

    it('should throw AxiosError on API failure', async () => {
      mock.onGet('/videos').reply(500, { error: 'Internal Server Error' })

      await expect(getVideo({ type: 'video' })).rejects.toThrow()
    })

    it('should throw AxiosError on network error', async () => {
      mock.onGet('/videos').networkError()

      await expect(getVideo({ type: 'video' })).rejects.toThrow()
    })

    it('should handle 404 error', async () => {
      mock.onGet('/videos').reply(404, { error: 'Not Found' })

      await expect(getVideo({ type: 'video' })).rejects.toThrow()
    })
  })

  describe('searchVideos', () => {
    it('should search videos with query', async () => {
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

      const response = await searchVideos({ q: 'test query', type: 'video' })

      expect(response.status).toBe(200)
      expect(response.data).toEqual(mockResponse)
      expect(mock.history.get[0].params).toMatchObject({
        part: 'snippet',
        chart: 'mostPopular',
        maxResults: 25,
        q: 'test query',
        type: 'video',
      })
    })

    it('should search videos without query', async () => {
      const mockResponse = { items: [] }
      mock.onGet('/search').reply(200, mockResponse)

      const response = await searchVideos({ type: 'video' })

      expect(response.status).toBe(200)
      expect(mock.history.get[0].params).toMatchObject({
        part: 'snippet',
        chart: 'mostPopular',
        maxResults: 25,
        type: 'video',
      })
    })

    it('should use default type "video" when not specified', async () => {
      const mockResponse = { items: [] }
      mock.onGet('/search').reply(200, mockResponse)

      await searchVideos({})

      expect(mock.history.get[0].params.type).toBe('video')
    })

    it('should throw AxiosError on API failure', async () => {
      mock.onGet('/search').reply(403, { error: 'Forbidden' })

      await expect(searchVideos({ q: 'test' })).rejects.toThrow()
    })

    it('should throw AxiosError on network error', async () => {
      mock.onGet('/search').networkError()

      await expect(searchVideos({ q: 'test' })).rejects.toThrow()
    })

    it('should handle quota exceeded error', async () => {
      mock.onGet('/search').reply(403, {
        error: {
          code: 403,
          message: 'The request cannot be completed because you have exceeded your quota.',
        },
      })

      await expect(searchVideos({ q: 'test' })).rejects.toThrow()
    })
  })
})
