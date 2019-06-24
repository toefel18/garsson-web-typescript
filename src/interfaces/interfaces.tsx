import {api} from "../apitypes";
import Order = api.Order;
import {User} from "../model/User";
import * as H from "history";

export interface LoggedInUser {
    user : User | undefined
}

export interface LoginInterface {
    doLogin: (username:string, password:string) => Promise<User>
}

export interface LogoutInterface {
    doLogout: () => void
}

export interface GetOrdersInterface {
    fetchOrders: () => Promise<any>
}

export interface GetOrderInterface {
    fetchOrderById: (orderId : string) => Promise<Order>
}

export interface RouteProps {
    match: any, // this type is complex
    location: H.Location<H.LocationState>,
    history: H.History
}

export interface OrdersInterface {
    orders: api.Order[]
}

export interface ProductInterface {
    products: api.Product[]
}

export interface GetProductsInterface {
    fetchProducts: () => Promise<any>
}

export interface AddProductsInterface {
    addProduct: (product: api.Product) => Promise<any>
}