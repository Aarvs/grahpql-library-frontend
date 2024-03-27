// import { useState } from "react";
// import { useQuery } from "@apollo/client";
// import { ALL_BOOKS } from "../queries";

// const Books = () => {
//   const { loading, data } = useQuery(ALL_BOOKS);
//   const [selectedGenre, setSelectedGenre] = useState(null);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   const books = data.allBooks;

//   // Extract unique genres from books array
//   const genres = [...new Set(books.flatMap(book => book.genres))];

//   // Filter books based on selected genre
//   const filteredBooks = selectedGenre
//     ? books.filter(book => book.genres.includes(selectedGenre))
//     : books;

//   return (
//     <div>
//       <h2>Books</h2>
//       <div>
//         {/* Render buttons for each unique genre */}
//         {genres.map(genre => (
//           <button key={genre} onClick={() => setSelectedGenre(genre)}>
//             {genre}
//           </button>
//         ))}
//         {/* Button to reset filter */}
//         <button onClick={() => setSelectedGenre(null)}>All genres</button>
//       </div>
//       <table>
//         <tbody>
//           <tr>
//             <th>Title</th>
//             <th>Author</th>
//             <th>Published</th>
//           </tr>
//           {/* Render filtered books */}
//           {filteredBooks.map(book => (
//             <tr key={book.title}>
//               <td>{book.title}</td>
//               <td>{book.author ? book.author.name : "Unknown"}</td>
//               <td>{book.published}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Books;



import { useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

const Books = () => {
  const { loading, data } = useQuery(ALL_BOOKS);
  const [selectedGenre, setSelectedGenre] = useState(null);

  if (loading) {
    return <div>Loading...</div>;
  }

  const books = data.allBooks;

  // Extract unique genres from books array
  const genres = [...new Set(books.flatMap(book => book.genres))];

  // Filter books based on selected genre
  const filteredBooks = selectedGenre
    ? books.filter(book => book.genres.includes(selectedGenre))
    : books;

  return (
    <div>
      <h2>Books</h2>
      <div>
        {/* Render buttons for each unique genre */}
        {genres.map(genre => (
          <button key={genre} onClick={() => setSelectedGenre(genre)}>
            {genre}
          </button>
        ))}
        {/* Button to reset filter */}
        <button onClick={() => setSelectedGenre(null)}>All genres</button>
      </div>
      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {/* Render filtered books */}
          {filteredBooks.map(book => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author ? book.author.name : "Unknown"}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;

