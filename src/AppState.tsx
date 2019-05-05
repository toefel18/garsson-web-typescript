import React, {createContext, useState} from 'react';
import App from "./App";
import {User} from "./model/User";
import jwtDecode from "jwt-decode";
import axios from "axios";

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
        console.log("jwt found, decoding")
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

const UserContext = createContext<User | undefined>(undefined)

const AppState: React.FC = () => {
    const [user, setUser] = useState<User | undefined>(getUserFromLocalStorageJwt())

    if (user) {
        const millisTillExpiry = user.expires.getTime() - new Date().getTime()
        alert("logging out")
        setTimeout(() => setUser(undefined), millisTillExpiry)
    }

    const doLogin = (username: string, password: string) => {
        axios.post("http://localhost:8080/v1/login", {email: username, password: password})
            .then(response => this.doLogin(response))
            .catch(error => {
                console.log(error);
                if (error.response && error.response.data.message) {
                    this.setState({loginError: error.response.data.message})
                } else {
                    this.setState({loginError: error.message})
                }
            });
    }

    return (
        <UserContext.Provider value={user}>
            <App/>
        </UserContext.Provider>);
}

export default AppState;
