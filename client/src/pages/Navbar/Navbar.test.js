import { renderWithProviders, screen } from 'common/Utils/testUtils'
import Navbar from '.'
import userEvent from '@testing-library/user-event'

const mockNavigateFunction = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigateFunction,
}))

describe('Navbar Component', () => {
  beforeEach(() => {
    renderWithProviders(<Navbar />)
  })

  test('Component renders successfully', () => {
    const header = screen.getByText('Connect')
    expect(header).toBeInTheDocument()
  })

  test('Click on connect invoke navigate function', async () => {
    const header = screen.getByText('Connect')
    await userEvent.click(header)
    expect(mockNavigateFunction).toHaveBeenCalledWith('/home')
  })
})
