import { useState } from 'react'

const LoginForm = ({setMessage, login}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleOnSubmit = async (event) => {
    event.preventDefault()

    try{
      await login({username, password})
      setUsername('')
      setPassword('')
    }
    catch(exception){
      setMessage('invalid login')
      setTimeout(() => setMessage(null), 5000)
    }
  }

  return(
    <div>
      <form onSubmit={handleOnSubmit}>
        <div>
          username: <input
            onChange={({target}) => setUsername(target.value)}
            value = {username}
            type = 'text'/>
        </div>
        <div>
          password: <input
            onChange={({target}) => setPassword(target.value)}
            value = {password}
            type = 'password'/>
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm