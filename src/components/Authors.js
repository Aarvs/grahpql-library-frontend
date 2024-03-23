import { ALL_AUTHORS } from '../queries'
import { useQuery } from '@apollo/client'
import EditAuthor from './EditAuthor'

const Authors = () => {

  const result = useQuery(ALL_AUTHORS)
  console.log(result)

  if(result.loading){
    return(
      <div>loading...</div>
    )
  }

  const authors = result.data.allAuthors
  // console.log(authors)

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td style={{padding:5}}>{a.name}</td>
              <td style={{padding:5}}>{a.born}</td>
              <td style={{padding:5}}>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <EditAuthor authors={authors}/>
    </div>
  )
}

export default Authors
