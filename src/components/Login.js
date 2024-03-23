import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { LOGIN } from "../queries";
import { useApolloClient } from "@apollo/client";

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useState(null)

    const client = useApolloClient()

    const [login, result] = useMutation(LOGIN, {
        onError: (error) => {
            const message = error.graphQLErrors.map(e => e.message).join('\n')
            console.log(message)
        }
    })

    useEffect(() => {
        if(result.data){
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('user-auth-token', token)
        }
    }, [result.data])

    const submit = (event) => {
        event.preventDefault()

        login({variables: {username, password}})

        console.log('user logged-in')

        setUsername('')
        setPassword('')
    }

    const logout = () => {
        setToken(null)
        localStorage.clear()
        client.resetStore()
    }

    if(localStorage.getItem('user-auth-token')){
        return(
            <div>
                <h2 style={{marginBottom: "0px"}}>Your Token</h2>
                <div style={{marginBottom: "10px"}}>{localStorage.getItem('user-auth-token')}</div>
                <button onClick={logout}>logout</button>
            </div>
        )
    }

    return(
        <div>
            <form onSubmit={submit}>
                <div>
                    username: <input
                      value={username}
                      onChange={({target}) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password: <input
                      type="password"
                      value={password}
                      onChange={({target}) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login