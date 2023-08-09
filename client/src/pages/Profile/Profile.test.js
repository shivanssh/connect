import { renderWithProviders } from 'common/Utils/testUtils'
import Profile from '.'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useParams: () => ({
    userId: '64ca039c8e7e787e68241aaa',
  }),
}))

describe('Unit test cases for Profile Page', () => {
  it('Check whether the component is rendered successfully', () => {
    renderWithProviders(<Profile />)
    // const text = await screen.findByText("Test");
    // expect(text).toBeInTheDocument();
  })
})
