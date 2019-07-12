import React from "react";
import {Button, Modal, Table} from "semantic-ui-react";
import {api} from "../apitypes";
import EditProductForm from "./EditProductForm";
import {InternalProductTableInterface} from "./ProductTableViewInterface";

/**
 * A large view of the product table
 */
export const ProductTableViewLarge: React.FC<InternalProductTableInterface> = (props) => {

    const renderHeaderRowLarge = () => {
        return (<Table.Row>
            <Table.HeaderCell
                onClick={props.sortTable('id')}
                sorted={props.sortColumn === 'id' ? props.sortDirection : undefined}>ID</Table.HeaderCell>
            <Table.HeaderCell
                onClick={props.sortTable('name')}
                sorted={props.sortColumn === 'name' ? props.sortDirection : undefined}>Name</Table.HeaderCell>
            <Table.HeaderCell
                onClick={props.sortTable('brand')}
                sorted={props.sortColumn === 'brand' ? props.sortDirection : undefined}>Brand</Table.HeaderCell>
            <Table.HeaderCell
                onClick={props.sortTable('barcode')}
                sorted={props.sortColumn === 'barcode' ? props.sortDirection : undefined}>Barcode</Table.HeaderCell>
            <Table.HeaderCell
                onClick={props.sortTable('pricePerUnit')}
                sorted={props.sortColumn === 'pricePerUnit' ? props.sortDirection : undefined}>Price</Table.HeaderCell>
            <Table.HeaderCell
                onClick={props.sortTable('purchasePricePerUnit')}
                sorted={props.sortColumn === 'purchasePricePerUnit' ? props.sortDirection : undefined}>Costs</Table.HeaderCell>
            <Table.HeaderCell
                onClick={props.sortTable('unit')}
                sorted={props.sortColumn === 'unit' ? props.sortDirection : undefined}>Unit</Table.HeaderCell>
            <Table.HeaderCell
                onClick={props.sortTable('createdTime')}
                sorted={props.sortColumn === 'createdTime' ? props.sortDirection : undefined}>Created
                at</Table.HeaderCell>
            <Table.HeaderCell
                onClick={props.sortTable('lastEditTime')}
                sorted={props.sortColumn === 'lastEditTime' ? props.sortDirection : undefined}>Last updated
                at</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
        </Table.Row>)
    }

    const renderProductRowLarge = (product: api.Product) => {
        return (<Table.Row key={product.id || 0}>
            <Table.Cell>{product.id}</Table.Cell>
            <Table.Cell>{product.name}</Table.Cell>
            <Table.Cell>{product.brand}</Table.Cell>
            <Table.Cell>{product.barcode}</Table.Cell>
            <Table.Cell>{product.pricePerUnit}</Table.Cell>
            <Table.Cell>{product.purchasePricePerUnit}</Table.Cell>
            <Table.Cell>{product.unit}</Table.Cell>
            <Table.Cell>{product.createdTime}</Table.Cell>
            <Table.Cell>{product.lastEditTime}</Table.Cell>
            <Table.Cell>
                {renderDeleteProductButton(product.id || 0)}
                {renderEditProductButton(product)}
            </Table.Cell>
        </Table.Row>)
    }

    const renderDeleteProductButton = (id: number) => (
        <Button negative compact onClick={() => props.deleteProduct(id)}>X</Button>)

    const renderEditProductButton = (product: api.Product) => (
        <Modal closeIcon trigger={<Button compact color='orange'>Edit</Button>}>
            <Modal.Header>Edit product {product.id}: {product.brand} {product.name}</Modal.Header>
            <Modal.Content>
                <EditProductForm updateProduct={props.updateProduct} product={product}/>
            </Modal.Content>
        </Modal>
    )

    return (
        <Table striped sortable unstackable>
            <Table.Header>
                {renderHeaderRowLarge()}
            </Table.Header>
            <Table.Body>
                {props.products.map(product => renderProductRowLarge(product))}
            </Table.Body>
        </Table>
    )
}