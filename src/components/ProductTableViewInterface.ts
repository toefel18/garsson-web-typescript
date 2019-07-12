import {UpdateProductInterface} from "../interfaces/interfaces";
import {api} from "../apitypes";

export interface InternalProductTableInterface extends UpdateProductInterface {
    products: api.Product[],
    deleteProduct: (id: number) => void
    sortColumn: string,
    sortDirection: "ascending" | "descending"
    sortTable: (column: string) => void
}
