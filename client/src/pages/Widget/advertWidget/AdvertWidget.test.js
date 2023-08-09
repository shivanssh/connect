import { renderWithProviders, screen } from 'common/Utils/testUtils'
import AdvertWidget from './AdvertWidget'

describe('AdvertWidget Component', () => {
  test('Component renders successfully', () => {
    renderWithProviders(<AdvertWidget />)

    const check = screen.getByRole('heading', { name: 'Sponsored' })

    expect(check).toBeInTheDocument()
  })
})
