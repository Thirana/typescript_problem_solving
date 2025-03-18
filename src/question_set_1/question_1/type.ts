export type Product = {
    id: string;
    name: string;
    price: number;
};

export type Order = {
    orderId: string;
    productIds: string[];
};