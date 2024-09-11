import { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const [viewBlog, setViewBlog] = useState(false);
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
    updateBlog(updatedBlog);
  };

  const handleRemoveButton = () => {
    deleteBlog(blog);
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
