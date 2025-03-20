"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductMap = getProductMap;
exports.getCustomerMap = getCustomerMap;
exports.calculateOrderProfit = calculateOrderProfit;
/**
 * Creates a map of productId to Product for quick lookups.
 */
function getProductMap(products) {
    const productMap = new Map();
    for (const product of products) {
        productMap.set(product.id, product);
    }
    return productMap;
}
/**
 * Creates a map of customerId to Customer for quick lookups.
 */
function getCustomerMap(customers) {
    const customerMap = new Map();
    for (const customer of customers) {
        customerMap.set(customer.id, customer);
    }
    return customerMap;
}
/**
 * Calculates the profit for a single order.
 * Returns null if the order has invalid customer or product IDs.
 */
function calculateOrderProfit(order, productMap, customerMap) {
    const customer = customerMap.get(order.customerId);
    if (!customer) {
        return null;
    }
    let profit = 0;
    for (const item of order.items) {
        const product = productMap.get(item.productId);
        if (!product) {
            return null;
        }
        const discountPrice = product.price * (1 - customer.discount);
        profit += (discountPrice - product.cost) * item.quantity;
    }
    return profit;
}
