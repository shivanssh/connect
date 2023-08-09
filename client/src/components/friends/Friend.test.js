import { renderWithProviders, screen } from 'common/Utils/testUtils'
import Friend from './Friend'
import userEvent from '@testing-library/user-event'

const friendProps = {
  image: 'test.png',
  name: 'Test User',
  subtitle: 'Test Occupation',
  friendId: 'fakeFriendId',
}

const mockedUserNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUserNavigate,
}))

describe('Friend Component', () => {
  beforeEach(() => {
    renderWithProviders(<Friend {...friendProps} />)
  })

  test('Component renders successfully', () => {
    expect(screen.getByRole('heading', { level: 5 })).toBeInTheDocument()
    expect(screen.getByText('Test Occupation')).toBeInTheDocument()
  })

  test('Navigate function invoked', async () => {
    const navigateUserBtn = screen.getByTestId('user-profile-btn')
    await userEvent.click(navigateUserBtn)

    expect(mockedUserNavigate).toHaveBeenCalled()
  })
})
