import {api} from "../api/types";
import Order = api.Order;


export interface LoginInterface {
    doLogin: (username:string, password:string) => Promise<any>
}

export interface LogoutInterface {
    doLogout: () => void
}

export interface GetOrderInterface {
    fetchOrder: (orderId : string) => Promise<Order>
}