import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import RecommendedBooks from './components/RecommendedBooks'
import { Link, Route, Routes } from 'react-router-dom'
import { ALL_BOOKS, BOOK_ADDED } from './queries'
import { useApolloClient, useSubscription } from '@apollo/client'

export const updateCache = (cache, query, bookAdded) => {
  const uniqueByTitle = (b) => {
    let seen = new Set()
    return b.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }
  
  cache.updateQuery(query, ({allBooks}) => {
    return {
      allBooks: uniqueByTitle(allBooks.concat(bookAdded)),
    }
  })
}


const App = () => {

  const client = useApolloClient()

  const padding = {
    padding: 3
  }

  // useSubscription 
  useSubscription(BOOK_ADDED, {
    onData: ({data}) => {
      const addedBook = data.data.bookAdded
      console.log(data)
      updateCache(client.cache, {query: ALL_BOOKS}, addedBook)
      window.alert(`book ${addedBook.title} is added`)
    }
  })

  return (
    <div>
      <div>
        <Link to="/" style={padding}><button>authors</button></Link>
        <Link to="/books" style={padding}><button>books</button></Link>
        <Link to="/add" style={padding}><button>add books</button></Link>
        <Link to="/login" style={padding}><button>login</button></Link>
        <Link to="/recommendations" style={padding}><button>recommend</button></Link>
      </div>

      <Routes>
        <Route path='/' element={<Authors/>}/>
        <Route path='/books' element={<Books/>}/>
        <Route path='/add' element={<NewBook/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/recommendations' element={<RecommendedBooks/>}/>
      </Routes>
    </div>
  )
}

export default App
