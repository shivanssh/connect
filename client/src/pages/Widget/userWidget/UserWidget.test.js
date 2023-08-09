import { renderWithProviders, screen } from 'common/Utils/testUtils'
import userEvent from '@testing-library/user-event'
import UserWidget from './UserWidget'

const userWidgetProps = {
  userId: '64ca039c8e7e787e68241aaa',
  picturePath: 'p10.jpeg',
}

const mockedUserNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUserNavigate,
}))

describe('UserWidget', () => {
  test('Component renders successfully', () => {
    renderWithProviders(<UserWidget {...userWidgetProps} />)

    const fullName = screen.getByRole('heading', { name: 'Test Person' })
    const workLocation = screen.getByRole('heading', { name: 'Test Location' })

    expect(fullName).toBeInTheDocument()
    expect(workLocation).toBeInTheDocument()
  })

  test('Navigate function invoked', () => {
    renderWithProviders(<UserWidget {...userWidgetProps} />)

    const nameHeader = screen.getByRole('heading', { name: 'Test Person' })

    userEvent.click(nameHeader)
    expect(mockedUserNavigate).toHaveBeenCalled()
  })

  test('User is null', () => {
    renderWithProviders(<UserWidget />, { preloadedState: {} })
    const fullName = screen.queryByRole('heading', { name: 'Test Person' })

    expect(fullName).not.toBeInTheDocument()
  })
})
