import MockAdapter from 'axios-mock-adapter'
import apiClient from '@/lib/api/apiClient'
import { searchChannel } from '@/lib/api/channel'

describe('Channel API', () => {
  let mock: MockAdapter

  beforeEach(() => {
    mock = new MockAdapter(apiClient)
  })

  afterEach(() => {
    mock.restore()
  })

  describe('searchChannel', () => {
    it('should fetch channel information by channelId', async () => {
      const mockResponse = {
        kind: 'youtube#channelListResponse',
        items: [
          {
            id: 'channel123',
            snippet: {
              title: 'Test Channel',
              description: 'A test channel',
              thumbnails: {
                default: { url: 'https://example.com/thumb.jpg' },
              },
            },
          },
        ],
      }

      mock.onGet('/channels').reply(200, mockResponse)

      const response = await searchChannel({ channelId: 'channel123' })

      expect(response.status).toBe(200)
      expect(response.data).toEqual(mockResponse)
      expect(mock.history.get[0].params).toMatchObject({
        id: 'channel123',
        part: 'snippet',
      })
    })

    it('should handle multiple channel results', async () => {
      const mockResponse = {
        kind: 'youtube#channelListResponse',
        items: [
          {
            id: 'channel1',
            snippet: { title: 'Channel 1' },
          },
          {
            id: 'channel2',
            snippet: { title: 'Channel 2' },
          },
        ],
      }

      mock.onGet('/channels').reply(200, mockResponse)

      const response = await searchChannel({ channelId: 'channel1,channel2' })

      expect(response.status).toBe(200)
      expect(response.data.items).toHaveLength(2)
    })

    it('should handle empty results', async () => {
      const mockResponse = {
        kind: 'youtube#channelListResponse',
        items: [],
      }

      mock.onGet('/channels').reply(200, mockResponse)

      const response = await searchChannel({ channelId: 'nonexistent' })

      expect(response.status).toBe(200)
      expect(response.data.items).toHaveLength(0)
    })

    it('should throw AxiosError on API failure', async () => {
      mock.onGet('/channels').reply(500, { error: 'Internal Server Error' })

      await expect(searchChannel({ channelId: 'channel123' })).rejects.toThrow()
    })

    it('should throw AxiosError on network error', async () => {
      mock.onGet('/channels').networkError()

      await expect(searchChannel({ channelId: 'channel123' })).rejects.toThrow()
    })

    it('should handle 404 error for non-existent channel', async () => {
      mock.onGet('/channels').reply(404, { error: 'Not Found' })

      await expect(searchChannel({ channelId: 'invalid' })).rejects.toThrow()
    })

    it('should handle 403 forbidden error', async () => {
      mock.onGet('/channels').reply(403, { error: 'Forbidden' })

      await expect(searchChannel({ channelId: 'channel123' })).rejects.toThrow()
    })
  })
})
