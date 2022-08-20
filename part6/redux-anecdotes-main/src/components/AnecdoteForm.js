import { useDispatch } from "react-redux"
import { addAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addNote = event => {
        event.preventDefault()
        const target = event.target
        dispatch(addAnecdote(target.anecdote.value))
      }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addNote}>
                <div><input name = 'anecdote'/></div>
                <button type='submit'>create</button>
            </form>
      </div>
    )
}

export default AnecdoteForm