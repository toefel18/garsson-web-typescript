namespace api {


    type QuantityUnit = "ITEM" | "LITER" | "GRAM";

    interface Product {
        productId: string;
        productPrice: number;
        quantityUnit: QuantityUnit;
    }

    interface OrderLine {
        product: Product;
        quantity: number;
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