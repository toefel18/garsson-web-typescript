import React, {useEffect, useState} from "react";
import {GetProductsInterface, ProductInterface} from "../interfaces/interfaces";
import {Button, Responsive, Segment, Table} from "semantic-ui-react";
import {api} from "../apitypes";

interface ProductTableInterface extends ProductInterface, GetProductsInterface {
}

const numericPropertiesOfProduct = ["id", "pricePerUnit", "purchasePricePerUnit"]

const ProductTable: React.FC<ProductTableInterface> = (props) => {

    const [sortColumn, setSortColumn] = useState<string>("name")
    const [sortDirection, setSortDirection] = useState<'ascending' | 'descending'>("ascending")
    const [products, setProducts] = useState<api.Product[]>([...props.products])

    useEffect(() => {
        // create a comparator that sorts on string unless the sortColumn is a numeric type
        const comparator: (a: string, b: string) => number = numericPropertiesOfProduct.includes(sortColumn)
            ? (a: string, b: string) => Number(a) - Number(b)
            : (a: string, b: string) => a.localeCompare(b)

        const sortedProducts = [...props.products].sort((a: api.Product, b: api.Product) => {
            // required because typescript does not support a[sortColumn]
            const sortValueA = `${a[sortColumn as keyof api.Product]}`
            const sortValueB = `${b[sortColumn as keyof api.Product]}`

            if (sortDirection === 'ascending') {
                return comparator(sortValueA, sortValueB)
            } else {
                return comparator(sortValueB, sortValueA)
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

    const renderHeaderRowLarge = () => {
        return (<Table.Row>
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
                sorted={sortColumn === 'purchasePricePerUnit' ? sortDirection : undefined}>Costs</Table.HeaderCell>
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
        </Table.Row>)
    }

    const renderProductRowLarge = (product: api.Product) => {
        return (<Table.Row>
            <Table.Cell>{product.id}</Table.Cell>
            <Table.Cell>{product.name}</Table.Cell>
            <Table.Cell>{product.brand}</Table.Cell>
            <Table.Cell>{product.barcode}</Table.Cell>
            <Table.Cell>{product.pricePerUnit}</Table.Cell>
            <Table.Cell>{product.purchasePricePerUnit}</Table.Cell>
            <Table.Cell>{product.unit}</Table.Cell>
            <Table.Cell>{product.createdTime}</Table.Cell>
            <Table.Cell>{product.lastEditTime}</Table.Cell>
        </Table.Row>)
    }


    const renderHeaderRowSmall = () => {
        return (<Table.Row>
            <Table.HeaderCell
                onClick={sortTable('id')}
                sorted={sortColumn === 'id' ? sortDirection : undefined}>ID</Table.HeaderCell>
            <Table.HeaderCell
                onClick={sortTable('name')}
                sorted={sortColumn === 'name' ? sortDirection : undefined}>Name</Table.HeaderCell>
            <Table.HeaderCell
                onClick={sortTable('brand')}
                sorted={sortColumn === 'brand' ? sortDirection : undefined}>Brand</Table.HeaderCell>
            {/*<Table.HeaderCell*/}
            {/*    onClick={sortTable('barcode')}*/}
            {/*    sorted={sortColumn === 'barcode' ? sortDirection : undefined}>Barcode</Table.HeaderCell>*/}
            <Table.HeaderCell
                onClick={sortTable('pricePerUnit')}
                sorted={sortColumn === 'pricePerUnit' ? sortDirection : undefined}>Price</Table.HeaderCell>
            {/*<Table.HeaderCell*/}
            {/*    onClick={sortTable('purchasePricePerUnit')}*/}
            {/*    sorted={sortColumn === 'purchasePricePerUnit' ? sortDirection : undefined}>Costs</Table.HeaderCell>*/}
            {/*<Table.HeaderCell*/}
            {/*    onClick={sortTable('unit')}*/}
            {/*    sorted={sortColumn === 'unit' ? sortDirection : undefined}>Unit</Table.HeaderCell>*/}
            {/*<Table.HeaderCell*/}
            {/*    onClick={sortTable('createdTime')}*/}
            {/*    sorted={sortColumn === 'createdTime' ? sortDirection : undefined}>Created*/}
            {/*    at</Table.HeaderCell>*/}
            <Table.HeaderCell
                onClick={sortTable('lastEditTime')}
                sorted={sortColumn === 'lastEditTime' ? sortDirection : undefined}>Last updated
                at</Table.HeaderCell>
        </Table.Row>)
    }
    const renderProductRowSmall = (product: api.Product) => {
        return (<Table.Row>
            <Table.Cell>{product.id}</Table.Cell>
            <Table.Cell>{product.name}</Table.Cell>
            <Table.Cell>{product.brand}</Table.Cell>
            {/*<Table.Cell>{product.barcode}</Table.Cell>*/}
            <Table.Cell>{product.pricePerUnit}</Table.Cell>
            {/*<Table.Cell>{product.purchasePricePerUnit}</Table.Cell>*/}
            {/*<Table.Cell>{product.unit}</Table.Cell>*/}
            {/*<Table.Cell>{product.createdTime}</Table.Cell>*/}
            <Table.Cell>{product.lastEditTime}</Table.Cell>
        </Table.Row>)
    }

    return (
        <div style={{padding: "5px"}}>
            <div><Button onClick={props.fetchProducts}>Fetch products</Button></div>
            <Segment.Group>
                <Responsive minWidth={750}>
                    <Table striped sortable unstackable>
                        <Table.Header>
                            {renderHeaderRowLarge()}
                        </Table.Header>
                        <Table.Body>
                            {products.map(product => renderProductRowLarge(product))}
                        </Table.Body>
                    </Table>
                </Responsive>
                <Responsive maxWidth={750}>
                    <Table striped sortable unstackable>
                        <Table.Header>
                            {renderHeaderRowSmall()}
                        </Table.Header>
                        <Table.Body>
                            {products.map(product => renderProductRowSmall(product))}
                        </Table.Body>
                    </Table>
                </Responsive>
            </Segment.Group>
        </div>)
}


export default ProductTable