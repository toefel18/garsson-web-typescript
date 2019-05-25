import React from "react";
import {api} from "../apitypes";
import {Button, Label, Table} from "semantic-ui-react";
import dateFns from 'date-fns'

interface OrderFormInterface {
    order: api.Order
}

const OrderForm: React.FC<OrderFormInterface> = (props) => {

    const createdTime = dateFns.format(dateFns.parse(props.order.createdTime || new Date()), "HH:mm")
    const preparedTime = dateFns.format(dateFns.parse(props.order.preparedTime || new Date()), "HH:mm")
    const deliveredTime = dateFns.format(dateFns.parse(props.order.deliveredTime || new Date()), "HH:mm")
    const paidTime = dateFns.format(dateFns.parse(props.order.paidTime || new Date()), "HH:mm")

    return (
        <div style={{padding: "15px", maxWidth: "500px", flexGrow: 1}}>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <div><strong>Order {props.order.orderId}</strong></div>
                <div><Label>{props.order.state}</Label></div>
            </div>
            <span>Created: {createdTime}</span><br/>
            <span>Prepared: {preparedTime}</span><br/>
            <span>Delivered: {preparedTime}</span><br/>
            <span>Paid: {preparedTime}</span><br/>
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

            <div style={{display: "flex", justifyContent: "space-between"}}>
                <Button basic>Edit</Button> <Button color={"green"}>Ready</Button> <Button primary>Pay</Button>
            </div>
        </div>)
}

export default OrderForm