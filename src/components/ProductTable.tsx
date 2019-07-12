import React, {useEffect, useState} from "react";
import {
    AddProductInterface,
    DeleteProductInterface,
    GetProductsInterface,
    ProductInterface,
    UpdateProductInterface
} from "../interfaces/interfaces";
import {Button, Modal, Responsive, Segment} from "semantic-ui-react";
import {api} from "../apitypes";
import AddProductForm from "./AddProductForm";
import {ProductTableViewLarge} from "./ProductTableViewLarge";
import {ProductTableViewSmall} from "./ProductTableViewSmall";

interface ProductTableInterface extends ProductInterface,
    GetProductsInterface,
    AddProductInterface,
    DeleteProductInterface,
    UpdateProductInterface {
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

    function deleteProduct(id: number) {
        if (id !== -1) {
            props.deleteProduct(id)
        } else {
            props.fetchProducts()
        }
    }

    return (
        <div style={{padding: "5px"}}>
            <div>
                <Button onClick={props.fetchProducts}>Fetch products</Button>
                <Modal closeIcon trigger={<Button primary>Add New
                    Product</Button>}>
                    <Modal.Header>Add New Product</Modal.Header>
                    <Modal.Content>
                        <AddProductForm addProduct={props.addProduct}/>
                    </Modal.Content>
                </Modal>
            </div>
            <Segment.Group>
                <Responsive minWidth={750}>
                    <ProductTableViewLarge
                        products={products}
                        sortColumn={sortColumn}
                        sortDirection={sortDirection}
                        sortTable={sortTable}
                        deleteProduct={deleteProduct}
                        updateProduct={props.updateProduct}/>
                </Responsive>
                <Responsive maxWidth={750}>
                    <ProductTableViewSmall
                        products={products}
                        sortColumn={sortColumn}
                        sortDirection={sortDirection}
                        sortTable={sortTable}
                        deleteProduct={deleteProduct}
                        updateProduct={props.updateProduct}/>
                </Responsive>
            </Segment.Group>
        </div>)
}

export default ProductTable