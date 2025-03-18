"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orders = exports.products = void 0;
exports.products = [
    { id: "P1", name: "Laptop", price: 1000 },
    { id: "P2", name: "Mouse", price: 20 },
    { id: "P3", name: "Keyboard", price: 50 },
    { id: "P4", name: "Monitor", price: 200 },
    { id: "P5", name: "Headphones", price: 80 },
];
exports.orders = [
    { orderId: "O1", productIds: ["P1", "P2", "P3"] }, // Laptop, Mouse, Keyboard
    { orderId: "O2", productIds: ["P1", "P4"] }, // Laptop, Monitor
    { orderId: "O3", productIds: ["P2", "P5"] }, // Mouse, Headphones
    { orderId: "O4", productIds: ["P1", "P2", "P4"] }, // Laptop, Mouse, Monitor
    { orderId: "O5", productIds: ["P3", "P5"] }, // Keyboard, Headphones
];
