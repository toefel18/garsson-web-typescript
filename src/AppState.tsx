import React, {useState} from 'react';
import App from "./App";
import jwtDecode from 'jwt-decode'
import {User} from "./model/User";

interface JwtType {
  sub: string,
  roles: string[],
  exp: number
}

function processJwtIfPresent(onLogin: () => ): boolean {
  const rawJwt = localStorage.getItem("jwt")
  if (rawJwt) {
    console.log("jwt found, decoding")
    const parsedJwt: JwtType = jwtDecode(rawJwt)
    const user = new User(
        parsedJwt.sub,
        parsedJwt.roles,
        new Date(parsedJwt.exp * 1000))

    const millisTillExpiry = user.expires.getTime() - new Date().getTime()

    return true
  } else {
    console.log("no JWT found")
  }
  return false
}

const AppState: React.FC = () => {
  const [orders, setOrders] = useState([])


  return (<App/>);
}

export default AppState;
