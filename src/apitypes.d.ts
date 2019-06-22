export namespace api {


    interface OrderLine {
        productBrand: string;
        productId: string;
        productName: string;
        productPrice: number;
        quantity: number;
        quantityUnit: string;
    }

    type State = "CREATED" | "PREPARING" | "READY" | "DELIVERED" | "PAID";

    interface Order {
        clientId: string;
        createdTime: string | null;
        deliveredTime: string | null;
        orderId: string;
        orderLines: OrderLine[];
        paidTime: string | null;
        preparedTime: string | null;
        state: State;
        tableId: string;
        totalPrice: number;
        waiterId: string;
    }

    interface ApiError {
        message: string;
        serverTime: string;
        status: number;
        uri: string;
    }

    interface LoginCredentials {
        email: string;
        password: string;
    }

    interface SuccessfulLoginResponse {
        token: string;
    }

    interface Product {
        barcode: string | null;
        brand: string;
        createdTime: string | null;
        id: number | null;
        lastEditTime: string | null;
        name: string;
        pricePerUnit: string;
        purchasePricePerUnit: string | null;
        unit: string;
    }

    interface Version {
        application: string;
        buildTime: string;
        git_branch: string;
        git_commit: string;
        serverTime: string;
    }

    interface User {
        name: string;
        roles: string[];
    }
}