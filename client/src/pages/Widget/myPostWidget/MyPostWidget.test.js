import { renderWithProviders, screen } from 'common/Utils/testUtils'
import MyPostWidget from './MyPostWidget'

describe('MyPostWidget Component', () => {
  beforeEach(() => {
    renderWithProviders(<MyPostWidget picturePath="p10.jpeg" />)
  })

  test('Component renders successfully', () => {
    const postBtn = screen.getByRole('button', { name: 'POST' })
    expect(postBtn).toBeInTheDocument()
  })

  // Need to check
  // test('On post the API call should trigger', () => {
  //   const postBtn = screen.getByRole('button', { name: 'POST' })
  //   userEvent.click(postBtn)

  //   expect(jest.fn()).toBeCalledWith('http://localhost:3001/posts/createPost')
  // })
})
