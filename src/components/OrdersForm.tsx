import React from "react";
import OrderForm from "./OrderForm";
import {GetOrdersInterface, OrdersInterface} from "../interfaces/interfaces";
import {Button} from "semantic-ui-react";

interface OrdersFormInterface extends OrdersInterface, GetOrdersInterface {
}

const OrdersForm: React.FC<OrdersFormInterface> = (props) => {
    return (
        <div style={{padding:"5px"}}>
            <div><Button onClick={props.fetchOrders}>Fetch orders</Button></div>
            <div style={{display: "flex", flexWrap: "wrap"}}>
                {props.orders.map(order => (
                        <OrderForm key={order.orderId} order={order}/>
                ))}
            </div>

            {/*<Grid doubling columns={5} >*/}
            {/*    <Grid.Row>*/}
            {/*    {props.orders.map(order => (*/}
            {/*        <Grid.Column key={order.orderId}>*/}
            {/*            <OrderForm order={order}/>*/}
            {/*        </Grid.Column>*/}
            {/*    ))}*/}
            {/*    </Grid.Row>*/}
            {/*</Grid>*/}
        </div>)
}

export default OrdersForm