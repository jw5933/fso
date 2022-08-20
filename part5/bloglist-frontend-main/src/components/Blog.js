import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({blog, blogs, setBlogs}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [visible, setVisible] = useState(false)
  const showWhenVisible = {display: visible ? '': 'none'}
  const buttonName = visible ? 'hide' : 'view'

  const addLike = async (event) => {
    event.preventDefault()
    try {
      const newBlog = await blogService.addLike(blog)
      const newBlogs = blogs.map(blog => blog.id === newBlog.id ? newBlog: blog).sort((a, b) => b.likes - a.likes)
      setBlogs(newBlogs)
    }
    catch (exception){
      console.log(exception)
    }
  }

  const deleteBlog = async (event) => {
    event.preventDefault()
    if (window.confirm(`Delete blog "${blog.title}" by ${blog.author}?`)){
      try{
        await blogService.deleteBlog(blog)
        setBlogs(blogs.filter(ogBlog => ogBlog.id !== blog.id))
      }
      catch(exception){
        console.log(exception)
      }
    }
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} by {blog.author}
        <button onClick={() => setVisible(!visible)}>{buttonName}</button>
      </div>
      <div style = {showWhenVisible}>
        <div>url: {blog.url}</div>
        <div>
          likes: {blog.likes}
          <button onClick={addLike}>like</button>
        </div>
        <div>user: {blog.user.username}</div>
        <button onClick={deleteBlog}>delete</button>
      </div>
    </div>
  )
}


export default Blog