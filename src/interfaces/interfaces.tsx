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

export interface GetOrderInterface {
    fetchOrderById: (orderId : string) => Promise<Order>
}

export interface RouteProps {
    match: any, // this type is complex
    location: H.Location<H.LocationState>,
    history: H.History
}