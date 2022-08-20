import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const config = {
    headers: {
      Authorization: token
    },
  }
  const response = await axios.get(baseUrl, config)
  return response.data
}

const addBlog = async newBlog => {
  const config = {
    headers: {
      Authorization: token
    },
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const addLike = async blog => {
  const config = {
    headers: {
      Authorization: token
    },
  }
  const contents = {likes: blog.likes+1}
  const response = await axios.put(`${baseUrl}/${blog.id}`, contents, config)
  return response.data
}

const deleteBlog = async blog => {
  const config = {
    headers: {
      Authorization: token
    },
  }
  const response = await axios.delete(`${baseUrl}/${blog.id}`, config)
  return response.data
}

export default {getAll, setToken, addBlog, addLike, deleteBlog}