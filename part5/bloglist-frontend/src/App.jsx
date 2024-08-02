import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import { Login } from './components/Login'
import Notification from './components/Notification'
import NewBlog from './components/newBlog'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [user,setUser] = useState(null)
  const [errorMessage,setErrorMessage] = useState(null)
  const [title,setTitle] = useState('')
  const [author,setAuthor] = useState('')
  const [url,setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(()=> {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])


  const handleLogin = async(e) => {
    e.preventDefault()
    try{
      const user = await loginService.login({username,password})
      window.localStorage.setItem('loggedUser',JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setErrorMessage({ message: 'Login successful', type: 'success' })
      setTimeout(() => {
        setErrorMessage(null)
      },5000)
    }catch(exception){
      setErrorMessage({ message: 'Wrong credentials', type: 'error' })
      setTimeout(() => {
        setErrorMessage(null)
      },5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    try{
      const newBlog = {
        title,author,url
      }
      const returnedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(returnedBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      setErrorMessage({ message: `Blog "${returnedBlog.title}" by ${returnedBlog.author} added`, type: 'success' })
      setTimeout(()=>{
        setErrorMessage(null)
      },5000)
    }catch(error){
      setErrorMessage({ message: 'Failed to create blog', type: 'error' })
      setTimeout(()=> {
        setErrorMessage(null)
      },5000)
    }

  }
  return (
    <div>
      <h1>Blog</h1>
      
      {errorMessage === null ? null : <Notification message={errorMessage?.message} type={errorMessage?.type} />}
      {user === null ? (
        <Login username={username} password={password} setUsername={setUsername} setPassword={setPassword} handleLogin={handleLogin} /> 
      ) : (
        <div>
          <h3>{user.username} logged in</h3><button onClick={handleLogout}>Logout</button>
          <NewBlog title={title} setTitle={setTitle} author={author} setAuthor={setAuthor} url={url} setUrl={setUrl} handleCreate={handleCreate} />
          <h2>Blogs</h2>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App