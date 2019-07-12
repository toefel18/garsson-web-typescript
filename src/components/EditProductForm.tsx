import React, { useState } from 'react'
import { Button, Form, FormProps, Message, Select } from 'semantic-ui-react'
import { api } from '../apitypes'
import { UpdateProductInterface } from '../interfaces/interfaces'

interface EditProductForm extends UpdateProductInterface {
    product: api.Product
}

const EditProductForm: React.FC<EditProductForm> = props => {
    const [name, setName] = useState<string>(props.product.name)
    const [brand, setBrand] = useState<string>(props.product.brand)
    const [barcode, setBarcode] = useState<string | null>(props.product.barcode)
    const [unit, setUnit] = useState<string>(props.product.unit)
    const [price, setPrice] = useState<string>(props.product.pricePerUnit)
    const [cost, setCost] = useState<string | null>(props.product.purchasePricePerUnit)

    const [error, setError] = useState<string>('')

    const [selectOptions] = useState([
        { key: '1', value: 'BOTTLE', text: 'BOTTLE' },
        { key: '2', value: 'GLASS', text: 'GLASS' },
        { key: '3', value: 'PACKAGE', text: 'PACKAGE' },
    ])

    const onSubmit = (event: React.FormEvent<HTMLFormElement>, data: FormProps) => {
        console.log('Submitting')
        setError('')
        console.log(name, brand, barcode, unit, price, cost)

        const product: api.Product = {
            name: name,
            barcode: barcode,
            brand: brand,
            createdTime: props.product.createdTime,
            id: props.product.id,
            lastEditTime: props.product.lastEditTime,
            pricePerUnit: price,
            purchasePricePerUnit: cost,
            unit: unit,
        }

        props.updateProduct(product).catch(e => {
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
                    <input placeholder="product name" value={name} onChange={e => setName(e.target.value)} />
                </Form.Field>
                <Form.Field required>
                    <label>Product Brand</label>
                    <input placeholder="product brand" value={brand} onChange={e => setBrand(e.target.value)} />
                </Form.Field>
                <Form.Field required>
                    <label>Product Barcode</label>
                    <input placeholder="0231345648" value={barcode || ''} onChange={e => setBarcode(e.target.value)} />
                </Form.Field>
                <Form.Field required>
                    <label>Unit</label>
                    <Select
                        placeholder="Select the unit"
                        name="unit"
                        options={selectOptions}
                        defaultValue={'GLASS'}
                        onChange={(e, { value }) => setUnit(`${value}`)}
                    />
                </Form.Field>
                <Form.Field required>
                    <label>Price</label>
                    <input placeholder="1.95" value={price} onChange={e => setPrice(e.target.value)} />
                </Form.Field>
                <Form.Field required>
                    <label>Cost</label>
                    <input placeholder="1.10" value={cost || ''} onChange={e => setCost(e.target.value)} />
                </Form.Field>
                <Button type="submit">Update product</Button>
            </Form>
            {error !== '' && <Message danger>Failed: {error}</Message>}
        </>
    )
}

export default EditProductForm
