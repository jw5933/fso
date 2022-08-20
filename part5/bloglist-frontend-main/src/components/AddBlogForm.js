import { useState } from 'react'
import Toggleable from './Toggleable'
import PropTypes from 'prop-types'

const AddBlogForm = ({addBlog, setMessage}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleOnSubmit = async(event) => {
    event.preventDefault()
    try{
      const blog = await addBlog({title, author, url})
      setMessage(`added ${blog.title} by ${blog.author} to the list`)
      setTimeout(() => setMessage(null), 5000)
      // setTitle('')
      // setAuthor('')
      // setUrl('')
    }
    catch(exception){
      setMessage(exception.response.data.error)
      setTimeout(() => setMessage(null), 5000)
    }
  }

  return (
    <div>
      <Toggleable buttonLabel = 'new blog'>
        <h2>add a new blog</h2>
        <form onSubmit={handleOnSubmit}>
          <table>
            <tbody>
              <FormElement
                param = {'title'}
                value = {title}
                setValue = {setTitle}
              />
              <FormElement
                param = {'author'}
                value = {author}
                setValue = {setAuthor}
              />
              <FormElement
                param = {'url'}
                value = {url}
                setValue = {setUrl}
              />
            </tbody>
          </table>
          <button type='submit'>submit</button>
        </form>
      </Toggleable>
    </div>
  )
}

const FormElement = ({param, value, setValue}) => {
  return (
    <tr>
      <td>{param}: </td>
      <td>
        <input
          value={value}
          onChange = {({target}) => setValue(target.value)}/>
      </td>
    </tr>
  )
}

AddBlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired
}
export default AddBlogForm