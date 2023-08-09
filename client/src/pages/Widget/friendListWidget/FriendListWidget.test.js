import { renderWithProviders } from 'common/Utils/testUtils'
import FriendListWidget from './FriendListWidget'
import { mockInitialState } from 'common/Utils/testUtils'

describe('FriendListWidget Component', () => {
  test('Component renders successfully', () => {
    renderWithProviders(<FriendListWidget userId="testUserId" />, {
      preloadedState: { ...mockInitialState, friends: {} },
    })
    // console.log(screen.debug());
  })
})
