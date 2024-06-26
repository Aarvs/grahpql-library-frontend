import { useMutation} from '@apollo/client'
import { useState } from 'react'
import { ADD_BOOK, ALL_BOOKS } from '../queries'
import { updateCache } from '../App'

const NewBook = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [addedBook] = useMutation(ADD_BOOK, {
    // refetchQueries: [{query: ALL_BOOKS}, {query: ALL_AUTHORS}],
    onError: (error) => {
      const message = error.graphQLErrors.map(e => e.message).join('\n')
      console.log(message)
    },
    update: (cache, response)=> {
      updateCache(cache, {query: ALL_BOOKS}, response.data.bookAdded)
    }
  })

  const submit = async (event) => {
    event.preventDefault()

    addedBook({variables: {title, author, published: parseInt(published), genres}})

    console.log('add book...')

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }
  
  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook

