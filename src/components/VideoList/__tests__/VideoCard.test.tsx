import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import VideoCard from '@/components/VideoList/VideoCard'
import { VideoPreview } from '@/types/video'
import { ChakraProvider } from '@chakra-ui/react'
import { ReactNode } from 'react'

jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>
  }
})

const Wrapper = ({ children }: { children: ReactNode }) => (
  <ChakraProvider>{children}</ChakraProvider>
)

const mockVideo: VideoPreview = {
  kind: 'youtube#video',
  etag: 'test-etag',
  id: 'video123',
  snippet: {
    publishedAt: '2024-01-01T00:00:00Z',
    channelId: 'channel123',
    title: 'Test Video Title',
    description: 'Test description',
    thumbnails: {
      default: {
        url: 'https://i.ytimg.com/vi/video123/default.jpg',
        width: 120,
        height: 90,
      },
      medium: {
        url: 'https://i.ytimg.com/vi/video123/mqdefault.jpg',
        width: 320,
        height: 180,
      },
      high: {
        url: 'https://i.ytimg.com/vi/video123/hqdefault.jpg',
        width: 480,
        height: 360,
      },
      standard: {
        url: 'https://i.ytimg.com/vi/video123/sddefault.jpg',
        width: 640,
        height: 480,
      },
      maxres: {
        url: 'https://i.ytimg.com/vi/video123/maxresdefault.jpg',
        width: 1280,
        height: 720,
      },
    },
    channelTitle: 'Test Channel',
    tags: ['test', 'video'],
    categoryId: '10',
    liveBroadcastContent: 'none',
    defaultLanguage: 'en',
    localized: {
      title: 'Test Video Title',
      description: 'Test description',
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
    contentRating: {
      country: 'US',
      jurisdiction: 'US',
    },
  },
  statistics: {
    viewCount: 1000000,
    likeCount: 50000,
    favoriteCount: 0,
    commentCount: 1000,
  },
}

describe('VideoCard', () => {
  it('should render video title', () => {
    render(<VideoCard video={mockVideo} />, { wrapper: Wrapper })
    expect(screen.getByText('Test Video Title')).toBeInTheDocument()
  })

  it('should render channel title', () => {
    render(<VideoCard video={mockVideo} />, { wrapper: Wrapper })
    expect(screen.getByText('Test Channel')).toBeInTheDocument()
  })

  it('should render formatted view count', () => {
    render(<VideoCard video={mockVideo} />, { wrapper: Wrapper })
    expect(screen.getByText('1.0M')).toBeInTheDocument()
  })

  it('should render video thumbnail', () => {
    const { container } = render(<VideoCard video={mockVideo} />, { wrapper: Wrapper })
    const image = container.querySelector('img')
    if (image) {
      expect(image).toHaveAttribute('alt', 'Test Video Title')
      expect(image).toHaveAttribute('src', 'https://i.ytimg.com/vi/video123/hqdefault.jpg')
    } else {
      expect(container.querySelector('.chakra-skeleton')).toBeInTheDocument()
    }
  })

  it('should render video duration', () => {
    render(<VideoCard video={mockVideo} />, { wrapper: Wrapper })
    expect(screen.getByText(/330/)).toBeInTheDocument()
  })

  it('should link to correct video page', () => {
    render(<VideoCard video={mockVideo} />, { wrapper: Wrapper })
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/video/video123')
  })

  it('should render time ago text', () => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date('2024-01-15T00:00:00Z'))

    render(<VideoCard video={mockVideo} />, { wrapper: Wrapper })
    expect(screen.getByText(/ago|Today|Yesterday/)).toBeInTheDocument()

    jest.useRealTimers()
  })

  it('should call onHover after hovering for 500ms', () => {
    jest.useFakeTimers()
    const onHover = jest.fn()

    const { container } = render(<VideoCard video={mockVideo} onHover={onHover} showPreview={true} />, { wrapper: Wrapper })

    const card = screen.getByRole('link').parentElement
    if (card) {
      fireEvent.mouseEnter(card)
    }

    jest.advanceTimersByTime(500)

    expect(onHover).toHaveBeenCalledWith('video123')

    jest.useRealTimers()
  })

  it('should call onLeave when mouse leaves', () => {
    const onLeave = jest.fn()

    render(<VideoCard video={mockVideo} onLeave={onLeave} />, { wrapper: Wrapper })

    const card = screen.getByRole('link').parentElement
    if (card) {
      fireEvent.mouseEnter(card)
      fireEvent.mouseLeave(card)
    }

    expect(onLeave).toHaveBeenCalled()
  })

  it('should not call onHover if showPreview is false', () => {
    jest.useFakeTimers()
    const onHover = jest.fn()

    render(<VideoCard video={mockVideo} onHover={onHover} showPreview={false} />, { wrapper: Wrapper })

    const card = screen.getByRole('link')
    card.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))

    jest.advanceTimersByTime(500)

    expect(onHover).not.toHaveBeenCalled()

    jest.useRealTimers()
  })

  it('should handle video with object id', () => {
    const videoWithObjectId: VideoPreview = {
      ...mockVideo,
      id: {
        kind: 'youtube#video',
        videoId: 'objectId123',
      },
    }

    render(<VideoCard video={videoWithObjectId} />, { wrapper: Wrapper })

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/video/objectId123')
  })

  it('should handle video without statistics', () => {
    const videoWithoutStats: VideoPreview = {
      ...mockVideo,
      statistics: undefined,
    }

    render(<VideoCard video={videoWithoutStats} />, { wrapper: Wrapper })
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('should handle video without duration', () => {
    const videoWithoutDuration: VideoPreview = {
      ...mockVideo,
      contentDetails: undefined,
    }

    render(<VideoCard video={videoWithoutDuration} />, { wrapper: Wrapper })
    expect(screen.queryByText(/ddd/)).not.toBeInTheDocument()
  })

  it('should render more options button', () => {
    render(<VideoCard video={mockVideo} />, { wrapper: Wrapper })
    const moreButton = screen.getByLabelText('More options')
    expect(moreButton).toBeInTheDocument()
  })

  it('should render play button icon', () => {
    render(<VideoCard video={mockVideo} />, { wrapper: Wrapper })
    const playButton = screen.getByLabelText('Play video')
    expect(playButton).toBeInTheDocument()
  })
})
