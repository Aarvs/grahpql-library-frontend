import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import { Link, Route, Routes } from 'react-router-dom'


const App = () => {

  const padding = {
    padding: 3
  }

  return (
    <div>
      <div>
        <Link to="/" style={padding}><button>authors</button></Link>
        <Link to="/books" style={padding}><button>books</button></Link>
        <Link to="/add" style={padding}><button>add books</button></Link>
        <Link to="/login" style={padding}><button>login</button></Link>

      </div>

      <Routes>
        <Route path='/' element={<Authors/>}/>
        <Route path='/books' element={<Books/>}/>
        <Route path='/add' element={<NewBook/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </div>
  )
}

export default App
