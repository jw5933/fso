import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import AddBlogForm from './components/AddBlogForm'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  const addBlog = async blog => {
    const addedBlog = await blogService.addBlog(blog)
    setBlogs(blogs.concat(addedBlog))
    return addedBlog
  }

  const login = async user => {
    const newUser = await loginService.login(user)
    window.localStorage.setItem('loggedBlogUser', JSON.stringify(newUser))
    blogService.setToken(newUser.token)
    setUser(newUser)
  }

  const handleLogOut = (event) => {
    event.preventDefault()
    try{
      window.localStorage.removeItem('loggedBlogUser')
      setUser(null)
      blogService.setToken(null)
    }
    catch(exception){
      setMessage(exception.response.data.error)
      setTimeout(() => setMessage(null), 5000)
    }
  }

  useEffect(() => {
    const userJSON = window.localStorage.getItem('loggedBlogUser')
    if (userJSON){
      const user = JSON.parse(userJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    if (user){
      const fetchBlogs = async () => {
        const blogs = await blogService.getAll()
        setBlogs(blogs.sort((a, b) => b.likes - a.likes))
      }

      fetchBlogs()
        .catch(error => console.log('error fetching blogs', error))
    }
  }, [user])

  return (
    <div>
      <Notification message={message}/>
      {user ?
        <div>
          <h2>
          Welcome {user.name}.
            <button onClick={handleLogOut}>logout</button>
          </h2>
          <AddBlogForm addBlog={addBlog} setMessage={setMessage}/>
          <ShowBlogs blogs = {blogs} setBlogs = {setBlogs}/>
        </div>
        : <div>
          <LoginForm setMessage={setMessage} login={login}/>
        </div>
      }
    </div>
  )
}

const ShowBlogs = ({ blogs, setBlogs }) => {
  return (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} blogs = {blogs} setBlogs = {setBlogs}/>
      )}
    </div>
  )
}



export default App
