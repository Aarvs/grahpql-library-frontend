import { useMutation } from "@apollo/client"
import { useState } from "react"
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries"

const EditAuthor = ({authors}) => {

    const [name, setName] = useState('')
    const [born, setBorn] = useState('')


    const [editedAuthor] = useMutation(EDIT_AUTHOR, {
        refetchQueries: [{query: ALL_AUTHORS}],
        onError: (error) => {
            const message = error.graphQLErrors.map(e => e.message).join('\n')
            console.log(message)
        }
    })
    const submit = (e) => {
        e.preventDefault()

        editedAuthor({variables: {name, setBornTo: parseInt(born)}})
        
        console.log("edit born year")
        setName('')
        setBorn('')
    }
    return(
        <div>
            <h3>Set birthyear</h3>
            <form onSubmit={submit}>
                <div>
                    <label>
                        Pick a name:
                        <select value={name} onChange={({target}) => setName(target.value)}>
                            {authors.map(a => (
                                <option key={a.name} value={a.name}>{a.name}</option>
                            ))}
                        </select>
                    </label>
                </div>
                <div>
                    born: <input value={born} onChange={({target}) => setBorn(target.value)}/>
                </div>
                <button type="submit">update author</button>
            </form>
        </div>
    )
}

export default EditAuthor