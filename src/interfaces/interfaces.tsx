import { api } from '../apitypes'
import Order = api.Order
import { User } from '../model/User'
import * as H from 'history'

export interface LoggedInUser {
    user: User | undefined
}

export interface LoginInterface {
    doLogin: (username: string, password: string) => Promise<User>
}

export interface LogoutInterface {
    doLogout: () => void
}

export interface OrdersInterface {
    orders: api.Order[]
}

export interface GetOrdersInterface {
    fetchOrders: () => Promise<any> //TODO provide promise type
}

export interface GetOrderInterface {
    fetchOrderById: (orderId: string) => Promise<Order>
}

export interface RouteProps {
    match: any // this type is complex
    location: H.Location<H.LocationState>
    history: H.History
}

export interface ProductsInterface {
    products: api.Product[]
}

export interface GetProductsInterface {
    fetchProducts: () => Promise<any>
}

export interface AddProductInterface {
    addProduct: (product: api.Product) => Promise<any>
}

export interface UpdateProductInterface {
    updateProduct: (product: api.Product) => Promise<any>
}

export interface DeleteProductInterface {
    deleteProduct: (productId: number) => Promise<any>
}
