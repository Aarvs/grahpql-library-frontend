import { useQuery } from "@apollo/client";
import { FILTER_RECOMMEND } from "../queries";

const RecommendedBooks = () => {

    const token = localStorage.getItem('user-auth-token')

    const result = useQuery(FILTER_RECOMMEND)
    console.log(result)

    if(result.loading){
        return(
            <div>Loading...</div>
        )
    }

    if(!token){
        return(
            <h1>Login First</h1>
        )
    }

    const books = result.data.allBooksByFavouriteGenre
    console.log(books)

    return(
        <div>
            <h3>recommendations</h3>
            <div>books in your fovourite genre <b>patterns</b></div>

            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>auther</th>
                        <th>published</th>
                    </tr>
                    {books.map(b => (
                        <tr key={b.title}>
                            <td><b>{b.title}</b></td>
                            <td>{b.author ? b.author.name : "Unknown"}</td>
                            <td>{b.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default RecommendedBooks