import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteBlog, updateBlog } from '../reducers/blogReducer';
import { clearNotification, setNotification } from '../reducers/notificationReducer';

const Blog = ({ blog  }) => {
  const [viewBlog, setViewBlog] = useState(false);
  const dispatch = useDispatch()
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleViewButton = () => {
    return setViewBlog(!viewBlog);
  };

  const handleLikeButton = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    dispatch(updateBlog(updatedBlog))
    dispatch(setNotification(`Liked ${blog.title} by ${blog.author}`))
    setTimeout(() => {
      dispatch(clearNotification())
    },5000)
  };

  const handleRemoveButton = () => {
    dispatch(deleteBlog(blog.id))
    dispatch(setNotification(`Removed ${blog.title} by ${blog.author}`))
    setTimeout(() => {
      dispatch(clearNotification())
    },5000)
  };

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={handleViewButton}>view</button>
      {viewBlog ? (
        <div>
          <p>Url:{blog.url}</p>
          <p>
            Likes: {blog.likes}
            <button onClick={handleLikeButton}>Like</button>
          </p>
          <button onClick={handleRemoveButton}>Remove</button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};
export default Blog;

Blog.propTypes = {
  deleteBlog: PropTypes.func.isRequired,
  updateBlog: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired,
};
