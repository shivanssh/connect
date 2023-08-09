import { renderWithProviders, screen } from '../../common/Utils/testUtils'
import UserImage from './UserImage'

describe('UserImage Component', () => {
  test('Check whether component rendered successfully', () => {
    renderWithProviders(<UserImage />)
    const altTag = screen.getByAltText('user')
    expect(altTag).toBeInTheDocument()
  })
})
