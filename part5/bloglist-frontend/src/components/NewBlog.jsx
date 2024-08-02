



export const NewBlog = (props) => {
  return (
    <form onSubmit={props.handleCreate}>
      <div>
        Title:
        <input value={props.title} placeholder='Title' onChange={({target}) => props.setTitle(target.value)} type='text'/>
      </div>
      <div>
        Author:
        <input value={props.author} placeholder='Author' onChange={({target}) => props.setAuthor(target.value)} type='text'/>
      </div>
      <div>
        Url:
        <input value={props.url} placeholder='Url' onChange={({target}) => props.setUrl(target.value)} type='text'/>
      </div>
      <button type='submit'>Create</button>
    </form>
  )
}

export default NewBlog