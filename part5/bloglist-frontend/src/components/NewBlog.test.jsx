import {render,screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NewBlog } from './NewBlog'


test('call event handler when receives props of a new blog', async () => {
  const mockSubmit = vi.fn(() => {
    return {
      success:true,
    }
  })

  render(<NewBlog createBlog={mockSubmit} />)

  const user = userEvent.setup()

  await user.type(screen.getByPlaceholderText(/itle/i), 'React patterns')
  await user.type(screen.getByPlaceholderText(/Author/i), 'Michael Chan')
  await user.type(screen.getByPlaceholderText(/Url/i), 'https://reactpatterns.com/')
  await user.click(screen.getByRole('button',{name:/create/i}))

  expect(mockSubmit).toBeCalledWith({
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',

  })
})