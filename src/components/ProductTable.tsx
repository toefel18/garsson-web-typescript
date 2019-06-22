import React, {useEffect, useState} from "react";
import {GetProductsInterface, ProductInterface} from "../interfaces/interfaces";
import {Button, Table} from "semantic-ui-react";
import {api} from "../apitypes";

interface ProductTableInterface extends ProductInterface, GetProductsInterface {
}

const ProductTable: React.FC<ProductTableInterface> = (props) => {

    const [sortColumn, setSortColumn] = useState<string>("name")
    const [sortDirection, setSortDirection] = useState<'ascending' | 'descending'>("ascending")
    const [products, setProducts] = useState<api.Product[]>([...props.products])

    useEffect(() => {
        const sortedProducts = [...props.products].sort((a: api.Product, b: api.Product) => {
            // required because typescript does not support a[sortColumn]
            const sortValueA = `${a[sortColumn as keyof api.Product]}`
            const sortValueB = `${b[sortColumn as keyof api.Product]}`

            if (sortDirection === 'ascending') {
                return sortValueA.localeCompare(sortValueB)
            } else {
                return sortValueB.localeCompare(sortValueA)
            }
        })

        setProducts(sortedProducts)
    }, [sortColumn, sortDirection, props.products])

    const sortTable = (column: string) => () => {
        if (column === sortColumn) {
            setSortDirection(sortDirection === 'ascending' ? 'descending' : 'ascending')
        } else {
            setSortColumn(column)
        }
    }

    const renderProductRow = (product: api.Product) => {
        return (<Table.Row>
            <Table.HeaderCell>{product.id}</Table.HeaderCell>
            <Table.HeaderCell>{product.name}</Table.HeaderCell>
            <Table.HeaderCell>{product.brand}</Table.HeaderCell>
            <Table.HeaderCell>{product.barcode}</Table.HeaderCell>
            <Table.HeaderCell>{product.pricePerUnit}</Table.HeaderCell>
            <Table.HeaderCell>{product.purchasePricePerUnit}</Table.HeaderCell>
            <Table.HeaderCell>{product.unit}</Table.HeaderCell>
            <Table.HeaderCell>{product.createdTime}</Table.HeaderCell>
            <Table.HeaderCell>{product.lastEditTime}</Table.HeaderCell>
        </Table.Row>)
    }

    return (
        <div style={{padding: "5px"}}>
            <div><Button onClick={props.fetchProducts}>Fetch products</Button></div>
            <Table celled striped large>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell
                            onClick={sortTable('id')}
                            sorted={sortColumn === 'id' ? sortDirection : undefined}>ID</Table.HeaderCell>
                        <Table.HeaderCell
                            onClick={sortTable('name')}
                            sorted={sortColumn === 'name' ? sortDirection : undefined}>Name</Table.HeaderCell>
                        <Table.HeaderCell
                            onClick={sortTable('brand')}
                            sorted={sortColumn === 'brand' ? sortDirection : undefined}>Brand</Table.HeaderCell>
                        <Table.HeaderCell
                            onClick={sortTable('barcode')}
                            sorted={sortColumn === 'barcode' ? sortDirection : undefined}>Barcode</Table.HeaderCell>
                        <Table.HeaderCell
                            onClick={sortTable('pricePerUnit')}
                            sorted={sortColumn === 'pricePerUnit' ? sortDirection : undefined}>Price</Table.HeaderCell>
                        <Table.HeaderCell
                            onClick={sortTable('purchasePricePerUnit')}
                            sorted={sortColumn === 'purchasePricePerUnit' ? sortDirection : undefined}>Purchase
                            price</Table.HeaderCell>
                        <Table.HeaderCell
                            onClick={sortTable('unit')}
                            sorted={sortColumn === 'unit' ? sortDirection : undefined}>Unit</Table.HeaderCell>
                        <Table.HeaderCell
                            onClick={sortTable('createdTime')}
                            sorted={sortColumn === 'createdTime' ? sortDirection : undefined}>Created
                            at</Table.HeaderCell>
                        <Table.HeaderCell
                            onClick={sortTable('lastEditTime')}
                            sorted={sortColumn === 'lastEditTime' ? sortDirection : undefined}>Last updated
                            at</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {products.map(product => renderProductRow(product))}
                </Table.Body>
                {/*{props.products.map(product => <ProductRow key={product.id || 0} {...product}/>)}*/}
            </Table>
        </div>)
}


export default ProductTable