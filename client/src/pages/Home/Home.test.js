import { renderWithProviders, screen } from 'common/Utils/testUtils'
import Home from '.'

describe('Home Page', () => {
  test('Component renders successfully', () => {
    renderWithProviders(<Home />)
    const header = screen.getByText('Connect')
    expect(header).toBeInTheDocument()
  })
})
