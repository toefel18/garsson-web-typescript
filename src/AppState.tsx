import React, {useState} from 'react';
import App from "./App";
import {User} from "./model/User";
import jwtDecode from "jwt-decode";
import axios from "axios";
import UserContext from './context/UserContext'
import {api} from "./apitypes";

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
    const [orders, setOrders] = useState<api.Order[]>([])
    const [products, setProducts] = useState<api.Product[]>([])

    if (user) {
        const millisTillExpiry = user.expires.getTime() - new Date().getTime()
        console.log("Setting auto-logout timeout")
        setTimeout(() => setUser(undefined), millisTillExpiry)
    }

    const doLogin = (username: string, password: string): Promise<User> => {
        return axios.post("http://localhost:8080/api/v1/login", {email: username, password: password})
            .then(response => {
                const successfulLoginResponse: api.SuccessfulLoginResponse = response.data
                localStorage.setItem("jwt", successfulLoginResponse.token)
                const user = getUserFromLocalStorageJwt()
                setUser(user)
                if (user) {
                    return user
                } else {
                    throw new Error("user from JWT not parsed correctly")
                }
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

    const fetchOrders = (): Promise<any> => {
        return axios.get("http://localhost:8080/api/v1/orders", {headers: {'Authorization': `Bearer ${localStorage.getItem('jwt')}`}})
            .then(res => {
                setOrders(res.data)
            })
            .catch(err => {
                console.log("Fetch orders failed", err)
                return Promise.reject(err)
            })
    }

    const fetchProducts = (): Promise<any> => {
        return axios.get("http://localhost:8080/api/v1/products", {headers: {'Authorization': `Bearer ${localStorage.getItem('jwt')}`}})
            .then(res => {
                setProducts(res.data)
            })
            .catch(err => {
                console.log("Fetch products failed", err)
                return Promise.reject(err)
            })
    }

    const addProduct = (product : api.Product): Promise<any> => {
        return axios.post("http://localhost:8080/api/v1/products",product, {headers: {'Authorization': `Bearer ${localStorage.getItem('jwt')}`}})
            .then(res => {
                console.log("Product added!", res)
                fetchProducts() // TODO should update page, but it does not
                return res
            })
            .catch(err => {
                console.log("Add product failed", product, err)
                return Promise.reject(err)
            })
    }

    if (orders.length === 0) fetchOrders()
    if (products.length === 0) fetchProducts()

    return (
        <UserContext.Provider value={user}>
            <App
                doLogin={doLogin}
                doLogout={doLogout}
                fetchOrderById={fetchOrder}
                fetchOrders={fetchOrders}
                user={user}
                orders={orders}
                fetchProducts={fetchProducts}
                products={products}
                addProduct={addProduct}
            />
        </UserContext.Provider>);
}

export default AppState;
