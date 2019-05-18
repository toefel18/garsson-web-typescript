import React from "react";
import OrderForm from "./OrderForm";
import {GetOrdersInterface, OrdersInterface} from "../interfaces/interfaces";
import {Button} from "semantic-ui-react";

interface OrdersFormInterface extends OrdersInterface, GetOrdersInterface {
}

const OrdersForm: React.FC<OrdersFormInterface> = (props) => {
    return (<div>
        <div><Button onClick={props.fetchOrders}>Fetch orders</Button></div>
        {props.orders.map(order => <OrderForm key={order.orderId} order={order}/>)}
    </div>)
}

export default OrdersForm