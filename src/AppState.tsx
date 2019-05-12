import React, {useState} from 'react';
import App from "./App";
import {User} from "./model/User";
import jwtDecode from "jwt-decode";
import axios from "axios";
import UserContext from './context/UserContext'
import {api} from "./api/types";

interface JwtType {
    sub: string,
    roles: string[],
    exp: number
}

function isExpired(parsedJwt: JwtType) {
    return parsedJwt.exp * 1000 < new Date().getTime();
}

function getUserFromLocalStorageJwt(): User | undefined {
    const rawJwt = localStorage.getItem("jwt")

    if (rawJwt) {
        const parsedJwt: JwtType = jwtDecode(rawJwt)
        if (isExpired(parsedJwt)) {
            console.log("jwt expired")
            localStorage.removeItem("jwt")
        }
        return new User(
            parsedJwt.sub,
            parsedJwt.roles,
            new Date(parsedJwt.exp * 1000))
    } else {
        console.log("no JWT found")
    }

    return undefined
}

const AppState: React.FC = () => {
    const [user, setUser] = useState<User | undefined>(getUserFromLocalStorageJwt())

    if (user) {
        const millisTillExpiry = user.expires.getTime() - new Date().getTime()
        console.log("Setting auto-logout timeout")
        setTimeout(() => setUser(undefined), millisTillExpiry)
    }

    const doLogin = (username: string, password: string): Promise<any> => {
        return axios.post("http://localhost:8080/api/v1/login", {email: username, password: password})
            .then(response => {
                const successfulLoginResponse : api.SuccessfulLoginResponse = response.data
                localStorage.setItem("jwt", successfulLoginResponse.token)
                const user = getUserFromLocalStorageJwt()
                setUser(user)
                return user
            })
            .catch(error => {
                console.log(`Error during doLogin`, error)
                localStorage.removeItem("jwt")
                if (error.response) {
                    return Promise.reject(error.response.data.message)
                } else if (error.request) {
                    return Promise.reject(`Request made, but not response received: ${error.message}`)
                } else {
                    return Promise.reject(`Making the request failed: ${error.message}`)
                }
            });
    }

    const doLogout = () => {
        localStorage.removeItem("jwt")
        setUser(undefined)
    }

    const fetchOrder = (orderId: string): Promise<api.Order> => {
        return Promise.reject("too bad")
    }

    return (
        <UserContext.Provider value={user}>
            <App
                doLogin={doLogin}
                doLogout={doLogout}
                fetchOrder={fetchOrder}
            />
        </UserContext.Provider>);
}

export default AppState;
