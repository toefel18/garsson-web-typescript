import React from "react";
import {api} from "../apitypes";
import {Table} from "semantic-ui-react";

interface OrderFormInterface {
    order: api.Order
}

const OrderForm: React.FC<OrderFormInterface> = (props) => {
    return (
        <div style={{display: "inline-block", margin: "5px"}}>
            <strong>Order {props.order.orderId}</strong><br/>
            <span>Created: {props.order.createdTime}</span><br/>
            <span>Waiter: {props.order.waiterId}</span><br/>

            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Product</Table.HeaderCell>
                        <Table.HeaderCell>Count</Table.HeaderCell>
                        <Table.HeaderCell>Price</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {props.order.orderLines.map(line => {
                        return <Table.Row key={line.product.productId}>
                            <Table.Cell>{line.product.productId}</Table.Cell>
                            <Table.Cell>{line.quantity}</Table.Cell>
                            <Table.Cell>&euro;{line.product.productPrice * line.quantity}</Table.Cell>
                        </Table.Row>
                    })}
                </Table.Body>

                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='2'>Totaal</Table.HeaderCell>
                        <Table.HeaderCell colSpan='1'>&euro; 15</Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        </div>)
}

export default OrderForm