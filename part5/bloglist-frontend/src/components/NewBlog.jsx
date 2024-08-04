import { useState } from 'react'
import PropTypes from 'prop-types'



export const NewBlog = ({createBlog}) => {
  const [newTitle,setNewTitle] = useState('')
  const [newAuthor,setNewAuthor] = useState('')
  const [newUrl,setNewUrl] = useState('')

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value)
  }
  const handleAuthorChange = (e) => {
    setNewAuthor(e.target.value)
  }
  const handleUrlChange = (e) => {
    setNewUrl(e.target.value)
  }

  const addBlog = (e) => {
    e.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }
  return (
    <form onSubmit={addBlog}>
      <div>
        Title:
        <input value={newTitle} placeholder='Title' onChange={handleTitleChange} type='text'/>
      </div>
      <div>
        Author:
        <input value={newAuthor} placeholder='Author' onChange={handleAuthorChange} type='text'/>
      </div>
      <div>
        Url:
        <input value={newUrl} placeholder='Url' onChange={handleUrlChange} type='text'/>
      </div>
      <button type='submit'>Create</button>
    </form>
  )
}

export default NewBlog

NewBlog.propTypes ={
  createBlog: PropTypes.object.isRequired
}