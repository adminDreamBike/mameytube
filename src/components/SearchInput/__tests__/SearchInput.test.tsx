import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SearchInput } from '@/components/SearchInput/SearchInput'
import { ChakraProvider } from '@chakra-ui/react'
import { ReactNode } from 'react'

const mockPush = jest.fn()

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

const Wrapper = ({ children }: { children: ReactNode }) => (
  <ChakraProvider>{children}</ChakraProvider>
)

describe('SearchInput', () => {
  beforeEach(() => {
    mockPush.mockClear()
  })

  it('should render search input', () => {
    render(<SearchInput />, { wrapper: Wrapper })
    expect(screen.getByPlaceholderText('Buscar')).toBeInTheDocument()
  })

  it('should render search button', () => {
    render(<SearchInput />, { wrapper: Wrapper })
    const buttons = screen.getAllByLabelText('Search database')
    expect(buttons.length).toBeGreaterThan(0)
  })

  it('should render microphone button', () => {
    render(<SearchInput />, { wrapper: Wrapper })
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(2)
  })

  it('should update input value when typing', async () => {
    const user = userEvent.setup()
    render(<SearchInput />, { wrapper: Wrapper })

    const input = screen.getByPlaceholderText('Buscar')
    await user.type(input, 'test query')

    expect(input).toHaveValue('test query')
  })

  it('should navigate to results page when Enter key is pressed', async () => {
    const user = userEvent.setup()
    render(<SearchInput />, { wrapper: Wrapper })

    const input = screen.getByPlaceholderText('Buscar')
    await user.type(input, 'test search')
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })

    expect(mockPush).toHaveBeenCalledWith('/results?q=test search')
  })

  it('should navigate to results page when search button is clicked', async () => {
    const user = userEvent.setup()
    render(<SearchInput />, { wrapper: Wrapper })

    const input = screen.getByPlaceholderText('Buscar')
    await user.type(input, 'button search')

    const searchButtons = screen.getAllByLabelText('Search database')
    await user.click(searchButtons[0])

    expect(mockPush).toHaveBeenCalledWith('/results?q=button search')
  })

  it('should clear input value after search', async () => {
    const user = userEvent.setup()
    render(<SearchInput />, { wrapper: Wrapper })

    const input = screen.getByPlaceholderText('Buscar')
    await user.type(input, 'clear test')

    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })

    expect(input).toHaveValue('')
  })

  it('should not navigate when input is empty and Enter is pressed', async () => {
    render(<SearchInput />, { wrapper: Wrapper })

    const input = screen.getByPlaceholderText('Buscar')
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })

    expect(mockPush).not.toHaveBeenCalled()
  })

  it('should not navigate when input is empty and button is clicked', async () => {
    const user = userEvent.setup()
    render(<SearchInput />, { wrapper: Wrapper })

    const searchButtons = screen.getAllByLabelText('Search database')
    await user.click(searchButtons[0])

    expect(mockPush).not.toHaveBeenCalled()
  })

  it('should not navigate when other keys are pressed', async () => {
    const user = userEvent.setup()
    render(<SearchInput />, { wrapper: Wrapper })

    const input = screen.getByPlaceholderText('Buscar')
    await user.type(input, 'test')

    fireEvent.keyDown(input, { key: 'a', code: 'KeyA' })

    expect(mockPush).not.toHaveBeenCalled()
  })

  it('should handle special characters in search query', async () => {
    const user = userEvent.setup()
    render(<SearchInput />, { wrapper: Wrapper })

    const input = screen.getByPlaceholderText('Buscar')
    await user.type(input, 'test & special!')

    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })

    expect(mockPush).toHaveBeenCalledWith('/results?q=test & special!')
  })

  it('should handle whitespace in search query', async () => {
    const user = userEvent.setup()
    render(<SearchInput />, { wrapper: Wrapper })

    const input = screen.getByPlaceholderText('Buscar')
    await user.type(input, '  test with spaces  ')

    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })

    expect(mockPush).toHaveBeenCalledWith('/results?q=  test with spaces  ')
  })

  it('should have correct input styling attributes', () => {
    render(<SearchInput />, { wrapper: Wrapper })

    const input = screen.getByPlaceholderText('Buscar')
    expect(input).toHaveAttribute('type', 'text')
  })
})
