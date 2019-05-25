import React from "react";
import OrderForm from "./OrderForm";
import {GetOrdersInterface, OrdersInterface} from "../interfaces/interfaces";
import {Button} from "semantic-ui-react";

interface OrdersFormInterface extends OrdersInterface, GetOrdersInterface {
}

const OrdersForm: React.FC<OrdersFormInterface> = (props) => {
    return (
        <div style={{padding: "5px"}}>
            <div><Button onClick={props.fetchOrders}>Fetch orders</Button></div>
            <div style={{display: "flex", flexWrap: "wrap"}}>
                {props.orders.map(order => <OrderForm key={order.orderId} order={order}/>)}
            </div>
        </div>)
}

export default OrdersForm