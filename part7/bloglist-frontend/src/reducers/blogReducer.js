import blogService from '../services/blogs';

const initalState = []

const blogReducer = (state = initalState,action) => {
  switch (action.type){
    case 'INIT_BLOGS':
      return action.data
    case 'NEW_BLOG':
      return [...state,action.data]
    case 'UPDATE_BLOG':
      return state.map(blog => blog.id === action.data.id ? action.data : blog)
    case 'DELETE_BLOG':
      return state.filter(blog => blog.id !== action.data.id)
    default:
      return state

  }
}

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type:'INIT_BLOGS',
      data:blogs
    })
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type:'NEW_BLOG',
      data:newBlog,
      
    })
  }
}

export const updateBlog = (blog) => {
  return async dispatch => {
    const returnedBlog = await blogService.update(blog)
    dispatch({
      type:'UPDATE_BLOG',
      data: returnedBlog
    })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type:'DELETE_BLOG',
      data:{id}
    })
  }
}

export default blogReducer