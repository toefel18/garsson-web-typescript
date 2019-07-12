import { api } from '../apitypes'
import { UpdateProductInterface } from '../interfaces/interfaces'

export interface InternalProductTableInterface extends UpdateProductInterface {
    products: api.Product[]
    deleteProduct: (id: number) => void
    sortColumn: string
    sortDirection: 'ascending' | 'descending'
    sortTable: (column: string) => void
}
