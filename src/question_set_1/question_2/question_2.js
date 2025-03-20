"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const data_1 = require("./data");
function calculateCustomerProfits(orders, products, customers) {
    const productMap = (0, utils_1.getProductMap)(products);
    const customerMap = (0, utils_1.getCustomerMap)(customers);
    const profitByCustomers = new Map();
    for (const order of orders) {
        const profit = (0, utils_1.calculateOrderProfit)(order, productMap, customerMap);
        if (profit === null) {
            continue;
        }
        const currentProfit = profitByCustomers.get(order.customerId) || 0;
        profitByCustomers.set(order.customerId, currentProfit + profit);
    }
    //converting to an array and rounding off the profits
    const result = [];
    for (const [customerId, totalProfit] of profitByCustomers) {
        result.push({
            customerId: customerId,
            totalProfit: Number(totalProfit.toFixed(2)),
        });
    }
    return result;
}
const profits = calculateCustomerProfits(data_1.orders, data_1.products, data_1.customers);
console.log(profits);
