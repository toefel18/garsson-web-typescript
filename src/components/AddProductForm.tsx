import React, {useState} from "react";
import {AddProductInterface} from "../interfaces/interfaces";
import {Button, Form, FormProps, Message, Select} from "semantic-ui-react";
import {api} from "../apitypes";

interface AddProductForm extends AddProductInterface {
}

const AddProductForm: React.FC<AddProductForm> = (props) => {

    const [name, setName] = useState<string>('')
    const [brand, setBrand] = useState<string>('')
    const [barcode, setBarcode] = useState<string>('')
    const [unit, setUnit] = useState<string>('')
    const [price, setPrice] = useState<string>('')
    const [cost, setCost] = useState<string>('')

    const [error, setError] = useState<string>('')

    const selectOptions = [
        {key: '1', value: 'BOTTLE', text: 'BOTTLE'},
        {key: '2', value: 'GLASS', text: 'GLASS'},
        {key: '3', value: 'PACKAGE', text: 'PACKAGE'},
    ]

    const onSubmit = (event: React.FormEvent<HTMLFormElement>, data: FormProps) => {
        console.log("Submitting")
        setError('')
        console.log(name, brand, barcode, unit, price, cost)

        const product: api.Product = {
            name: name,
            barcode: barcode,
            brand: brand,
            createdTime: null,
            id: null,
            lastEditTime: null,
            pricePerUnit: price,
            purchasePricePerUnit: cost,
            unit: unit
        }

        props.addProduct(product)
            .catch(e => {
                console.log(e.data.messasge)
                setError(e.data.message)
            })
    }

    return (
        <>
            <h1>Add Product</h1>
            <Form onSubmit={onSubmit}>
                <Form.Field required>
                    <label>Product Name</label>
                    <input placeholder='product name' value={name} onChange={(e) => setName(e.target.value)}/>
                </Form.Field>
                <Form.Field required>
                    <label>Product Brand</label>
                    <input placeholder='product brand' value={brand} onChange={(e) => setBrand(e.target.value)}/>
                </Form.Field>
                <Form.Field required>
                    <label>Product Barcode</label>
                    <input placeholder='0231345648' value={barcode} onChange={(e) => setBarcode(e.target.value)}/>
                </Form.Field>
                <Form.Field required>
                    <label>Unit</label>
                    <Select placeholder='Select the unit'
                            options={selectOptions}
                            defaultValue={"GLASS"}
                            onChange={(e, {value}) => setUnit(`${value}`)}/>
                </Form.Field>
                <Form.Field required>
                    <label>Price</label>
                    <input placeholder='1.95' value={price} onChange={(e) => setPrice(e.target.value)}/>
                </Form.Field>
                <Form.Field required>
                    <label>Cost</label>
                    <input placeholder='1.10' value={cost} onChange={(e) => setCost(e.target.value)}/>
                </Form.Field>
                <Button type='submit'>Add product</Button>
            </Form>
            {error !== '' && <Message danger>Failed: {error}</Message>}
        </>
    )
}


export default AddProductForm