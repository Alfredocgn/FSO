import {render,screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { expect } from 'vitest'


test('show title and author, hides url and likes', async() => {
  const blog ={
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,

  }

  render(<Blog blog={blog}/>)

  expect(screen.getByText(/React patterns/i)).toBeVisible()
  expect(screen.getByText(/Michael Chan/i)).toBeVisible()
})

test('show url and likes when expanded', async()=> {

  const blog ={
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,

  }

  render(<Blog blog={blog}/>)

  const user = userEvent.setup()

  await user.click(screen.getByRole('button', {name:/view/i}))

  expect(screen.getByText(/reactpatterns.com/i)).toBeVisible()
  expect(screen.getByText(/likes: 7/i)).toBeVisible()

})

test('clicked button twice, event handler called each time', async() => {
  const blog ={
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,

  }

  const mockUpdate = vi.fn()

  render(<Blog blog={blog} updateBlog={mockUpdate}/>)

  const user = userEvent.setup()

  await user.click(screen.getByRole('button',{name:/view/i}))
  await user.click(screen.getByRole('button',{name:/like/i}))
  await user.click(screen.getByRole('button',{name:/like/i}))

  expect(mockUpdate).toHaveBeenCalledTimes(2)


})