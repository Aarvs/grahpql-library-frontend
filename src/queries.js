import { gql } from "@apollo/client"

export const ALL_AUTHORS = gql`
  query{
    allAuthors{
        name
        born
        bookCount
    }
   }
`

export const ALL_BOOKS = gql`
  query{
    allBooks{
        title
        author{
          name
          bookCount
          born
        }
        published
    }
  }
`

export const ADD_BOOK = gql`
  mutation addNewBook($title: String!, $author: String!, $published: Int!, $genres: [String]){
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ){
      title
      author
      published
      genres
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation editExistingAuthor($name: String!, $setBornTo: Int!){
    editAuthor(
      name: $name,
      setBornTo: $setBornTo
    ){
      name
      born
      bookCount
    }
  }
`

export const LOGIN = gql`
  mutation loginUser($username: String!, $password: String!){
    login(
      username: $username,
      password: $password
    ){
      value
    }
  }
`

export const FILTER_RECOMMEND = gql`
  query recommendedBooks{
    allBooksByFavouriteGenre{
      author{
        name
      }
      title
      published
    }
  }
`

