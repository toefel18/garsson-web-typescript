import React from "react";
import OrderView from "./OrderView";
import {GetOrdersInterface, OrdersInterface} from "../interfaces/interfaces";
import {Button} from "semantic-ui-react";

interface OrdersDashboardInterface extends OrdersInterface, GetOrdersInterface {
}

const OrdersDashboard: React.FC<OrdersDashboardInterface> = (props) => {
    return (
        <div style={{padding: "5px"}}>
            <div><Button onClick={props.fetchOrders}>Fetch orders</Button></div>
            <div style={{display: "flex", flexWrap: "wrap"}}>
                {props.orders.map(order => <OrderView key={order.orderId} order={order}/>)}
            </div>
        </div>)
}

export default OrdersDashboard