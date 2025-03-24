"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterFn = filterFn;
exports.mergeFn = mergeFn;
exports.sortFn = sortFn;
exports.formatFn = formatFn;
// callback function for util function -> filterWarehouseInventory
function filterFn(product, warehouse, stockQty, warehouseId) {
    return product.stock > stockQty && warehouse.warehouseId === warehouseId;
}
// callback function for util function -> mergeInventories
function mergeFn(products) {
    const productMap = {};
    for (const product of products) {
        if (productMap[product.id]) {
            productMap[product.id].stock += product.stock;
        }
        else {
            productMap[product.id] = Object.assign({}, product);
        }
    }
    return Object.values(productMap);
}
// callback function for util function -> sortWarehouses
// Sorts warehouses by total inventory value in descending order
function sortFn(a, b) {
    const valueA = a.inventory.reduce((sum, product) => sum + product.price * product.stock, 0);
    const valueB = b.inventory.reduce((sum, product) => sum + product.price * product.stock, 0);
    return valueB - valueA;
}
// Callback for generateMultiWarehouseReport: Formats inventory stats into a readable report
function formatFn(stats) {
    let report = `Multi-Warehouse Inventory Report:\n`;
    report += `Total Products: ${stats.totalProducts}\n`;
    report += `Total Inventory Value: $${stats.totalValue.toFixed(2)}\n`;
    report += `Number of Warehouses: ${stats.warehouseCount}\n`;
    report += `Category Statistics:\n`;
    for (const category in stats.categoryStats) {
        const { count, avgPrice, totalStock } = stats.categoryStats[category];
        report += `- ${category}: ${count} products, Avg Price: $${avgPrice.toFixed(2)}, Total Stock: ${totalStock}\n`;
    }
    return report;
}
