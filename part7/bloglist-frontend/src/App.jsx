import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import { Login } from './components/Login';
import Notification from './components/Notification';
import NewBlog from './components/newBlog';
import Togglable from './components/Togglable';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearNotification,
  setNotification,
} from './reducers/notificationReducer';
import { initBlogs,updateBlog,createBlog,deleteBlog } from './reducers/blogReducer';

const App = () => {
/*   const [blogs, setBlogs] = useState([]); */
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
/*   const [errorMessage, setErrorMessage] = useState(null); */
  const blogFormRef = useRef();
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs)
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    console.log(loggedUserJSON)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
      dispatch(initBlogs())
    }
  }, [dispatch]);
/* 
  const getAllBlogs = async () => {
    try {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
    }
  };
 */
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
      dispatch(setNotification('Login successful', 'success'));
      setTimeout(() => {
        dispatch(clearNotification());
      }, 5000);
    } catch (exception) {
      dispatch(setNotification('Wrong credentials', 'error'));
      setTimeout(() => {
        dispatch(clearNotification());
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser');
    setUser(null);
  };

  const create = async (BlogToAdd) => {
    blogFormRef.current.toggleVisibility();

    try {
      /* const createdBlog = await blogService.create(BlogToAdd); */
      dispatch(createBlog(BlogToAdd))
      dispatch(setNotification(`Blog ${BlogToAdd.title} was successfully added`, 'success'))
/*       setErrorMessage({
        message: `Blog ${BlogToAdd.title} was successfully added`,
        type: 'success',
      }); */
/*       setBlogs(blogs.concat(createdBlog)); */
      setTimeout(() => {
        dispatch(clearNotification());
      }, 5000);
    } catch (error) {
      dispatch(setNotification('Failed to create blog', 'error'))
      /* setErrorMessage({ message: 'Failed to create blog', type: 'error' }); */
      setTimeout(() => {
        dispatch(clearNotification());
      }, 5000);
    }
  };

/*   const updateBlog = async (BlogToUpdate) => {
    try {
      const updatedBlog = await blogService.update(BlogToUpdate);
      console.log(updateBlog);
      setErrorMessage({
        message: `Blog ${BlogToUpdate.title} was successfully updated`,
        type: 'success',
      });
      setBlogs(
        blogs.map((blog) => (blog.id !== BlogToUpdate.id ? blog : updatedBlog))
      );
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } catch (error) {
      setErrorMessage({
        message: `Cannot update blog ${BlogToUpdate.title}`,
        type: 'error',
      });
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  }; */

  const update = (blog) => {
    try{
      dispatch(updateBlog(blog))
      dispatch(setNotification(`Blog ${blog.title} was successfully updated`, 'success'))
      setTimeout(() => {
        dispatch(clearNotification())
      },5000)
    }catch(error){
      dispatch(setNotification(`Cannot update blog ${blog.title}`, 'error'))
      setTimeout(() => {
        dispatch(clearNotification())
      },5000)
    }
  }

  const remove = (id) => {
    try{
      dispatch(deleteBlog(id))
      dispatch(setNotification('Blog was succesfully deleted','success'))
      setTimeout(() => {
        dispatch(clearNotification())
      },5000)
    }catch(error){
      dispatch(setNotification('Cannot delete blog','error'))
      setTimeout(() => {
        dispatch(clearNotification())
      },5000)
    }
  }

/*   const deleteBlog = async (BlogToDelete) => {
    try {
      if (window.confirm(`Delete ${BlogToDelete.title}?`)) {
        blogService.remove(BlogToDelete.id);
        setErrorMessage({
          message: `Blog ${BlogToDelete.title} was succesfully deleted`,
          type: 'success',
        });
        setBlogs(blogs.filter((blog) => blog.id !== BlogToDelete.id));
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      }
    } catch (error) {
      setErrorMessage({
        message: `Cannot delete ${BlogToDelete.title}`,
        type: 'error',
      });
    }
  }; */

  const byLikes = (b1, b2) => b2.likes - b1.likes;
  return (
    <div>
      <h1>Blog</h1>
      {notification && (
  <Notification message={notification.message} type={notification.type} />
)}
      {user === null ? (
        <Login
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      ) : (
        <div>
          <h3>{user.username} logged in</h3>
          <button onClick={handleLogout}>Logout</button>
          <Togglable buttonLabel="New Blog" ref={blogFormRef}>
            <NewBlog createBlog={create} />
          </Togglable>
          <h2>Blogs</h2>
          {blogs?.sort(byLikes).map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
