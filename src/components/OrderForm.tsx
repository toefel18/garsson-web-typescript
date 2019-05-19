import React from "react";
import {api} from "../apitypes";
import {Label, Table} from "semantic-ui-react";

interface OrderFormInterface {
    order: api.Order
}

const OrderForm: React.FC<OrderFormInterface> = (props) => {
    return (
        <div style={{padding: "5px", width: "250px", flexGrow: 1}}>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <div><strong>Order {props.order.orderId}</strong></div>
                <div><Label>{props.order.state}</Label></div>
            </div>
            <span>Created: {props.order.createdTime}</span><br/>
            <span>Waiter: {props.order.waiterId}</span><br/>
            <span>Tafel: {props.order.tableId}</span><br/>

            <Table compact={false} unstackable={true}>
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
                        <Table.HeaderCell colSpan='2'><b>Totaal</b></Table.HeaderCell>
                        <Table.HeaderCell colSpan='1'><b>&euro; 15</b></Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        </div>)
}

export default OrderForm