"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orders = exports.customers = exports.products = void 0;
exports.products = [
    { id: "P1", name: "Phone", cost: 200, price: 300 },
    { id: "P2", name: "Case", cost: 5, price: 20 },
];
exports.customers = [
    { id: "C1", discount: 0.1 }, // 10% discount
    { id: "C2", discount: 0.0 }, // No discount
];
exports.orders = [
    {
        id: "O1",
        customerId: "C1",
        items: [
            { productId: "P1", quantity: 2 },
            { productId: "P2", quantity: 1 },
        ],
    },
    {
        id: "O2",
        customerId: "C2",
        items: [{ productId: "P1", quantity: 1 }],
    },
    {
        id: "O3",
        customerId: "C1",
        items: [
            { productId: "P3", quantity: 1 }, // Invalid product ID
        ],
    },
];
