import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Filter } from '@/components/Filter/Filter'
import * as videosStore from '@/stores/videos'
import { ChakraProvider } from '@chakra-ui/react'
import { ReactNode } from 'react'

jest.mock('@/stores/videos', () => ({
  useVideoActions: jest.fn(),
}))

const Wrapper = ({ children }: { children: ReactNode }) => (
  <ChakraProvider>{children}</ChakraProvider>
)

const mockSetVideosByCategory = jest.fn()

describe('Filter', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(videosStore.useVideoActions as jest.Mock).mockReturnValue({
      setVideosByCategory: mockSetVideosByCategory,
    })
  })

  it('should render "All" button', () => {
    render(<Filter />, { wrapper: Wrapper })
    expect(screen.getByText('All')).toBeInTheDocument()
  })

  it('should render category buttons', () => {
    render(<Filter />, { wrapper: Wrapper })

    expect(screen.getByText('Film & Animation')).toBeInTheDocument()
    expect(screen.getByText('Music')).toBeInTheDocument()
    expect(screen.getByText('Gaming')).toBeInTheDocument()
    expect(screen.getByText('Sports')).toBeInTheDocument()
  })

  it('should render navigation buttons', () => {
    render(<Filter />, { wrapper: Wrapper })

    const buttons = screen.getAllByRole('button')
    const prevButton = buttons.find(btn => btn.getAttribute('aria-label') === 'prev')
    const nextButton = buttons.find(btn => btn.getAttribute('aria-label') === 'next')

    expect(prevButton).toBeInTheDocument()
    expect(nextButton).toBeInTheDocument()
  })

  it('should call setVideosByCategory with "all" when All button is clicked', async () => {
    const user = userEvent.setup()
    render(<Filter />, { wrapper: Wrapper })

    const allButton = screen.getByText('All')
    await user.click(allButton)

    expect(mockSetVideosByCategory).toHaveBeenCalledWith('all')
  })

  it('should call setVideosByCategory with category id when category button is clicked', async () => {
    const user = userEvent.setup()
    render(<Filter />, { wrapper: Wrapper })

    const musicButton = screen.getByText('Music')
    await user.click(musicButton)

    expect(mockSetVideosByCategory).toHaveBeenCalledWith('10')
  })

  it('should call setVideosByCategory with correct id for Gaming category', async () => {
    const user = userEvent.setup()
    render(<Filter />, { wrapper: Wrapper })

    const gamingButton = screen.getByText('Gaming')
    await user.click(gamingButton)

    expect(mockSetVideosByCategory).toHaveBeenCalledWith('20')
  })

  it('should render all 18 categories plus All button', () => {
    render(<Filter />, { wrapper: Wrapper })

    const buttons = screen.getAllByRole('button')
    const categoryButtons = buttons.filter(
      btn =>
        btn.getAttribute('aria-label') !== 'prev' &&
        btn.getAttribute('aria-label') !== 'next'
    )

    expect(categoryButtons).toHaveLength(19)
  })

  it('should render categories in correct order', () => {
    render(<Filter />, { wrapper: Wrapper })

    const allButton = screen.getByText('All')
    const filmButton = screen.getByText('Film & Animation')

    const allPosition = allButton.compareDocumentPosition(filmButton)
    expect(allPosition & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  })

  it('should have correct button values for each category', () => {
    render(<Filter />, { wrapper: Wrapper })

    const musicButton = screen.getByText('Music') as HTMLButtonElement
    expect(musicButton.value).toBe('10')

    const sportsButton = screen.getByText('Sports') as HTMLButtonElement
    expect(sportsButton.value).toBe('17')
  })

  it('should handle prev navigation button click', async () => {
    const user = userEvent.setup()
    render(<Filter />, { wrapper: Wrapper })

    const buttons = screen.getAllByRole('button')
    const prevButton = buttons.find(btn => btn.getAttribute('aria-label') === 'prev')

    if (prevButton) {
      await user.click(prevButton)
    }

    expect(prevButton).toBeInTheDocument()
  })

  it('should handle next navigation button click', async () => {
    const user = userEvent.setup()
    render(<Filter />, { wrapper: Wrapper })

    const buttons = screen.getAllByRole('button')
    const nextButton = buttons.find(btn => btn.getAttribute('aria-label') === 'next')

    if (nextButton) {
      await user.click(nextButton)
    }

    expect(nextButton).toBeInTheDocument()
  })

  it('should render Education category', () => {
    render(<Filter />, { wrapper: Wrapper })
    expect(screen.getByText('Education')).toBeInTheDocument()
  })

  it('should render Science & Technology category', () => {
    render(<Filter />, { wrapper: Wrapper })
    expect(screen.getByText('Science & Technology')).toBeInTheDocument()
  })

  it('should render Entertainment category', () => {
    render(<Filter />, { wrapper: Wrapper })
    expect(screen.getByText('Entertainment')).toBeInTheDocument()
  })

  it('should not call setVideosByCategory on initial render', () => {
    render(<Filter />, { wrapper: Wrapper })
    expect(mockSetVideosByCategory).not.toHaveBeenCalled()
  })
})
