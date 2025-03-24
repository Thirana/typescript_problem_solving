"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("./data");
const callbacks_1 = require("./callbacks");
const utils_1 = require("./utils");
function executeFilteredWarehouses() {
    const stockQty = 20;
    const warehouseId = "W1";
    const filteredWarehouses = (0, utils_1.filterWarehouseInventory)(data_1.warehouses, stockQty, warehouseId, callbacks_1.filterFn);
    const filteredProducts = filteredWarehouses.map((w) => w.inventory.map((p) => p.name));
    console.log(`Filtered inventory products for warehouse ${warehouseId} (stock > ${stockQty})\n`);
    console.log(filteredProducts);
}
function executeMergeInventories() {
    const totalInventories = (0, utils_1.mergeInventories)(data_1.warehouses, callbacks_1.mergeFn);
    console.log("Total Inventories:\n", totalInventories);
}
function executeSortWarehouses() {
    const sortedWarehouses = (0, utils_1.sortWarehouses)(data_1.warehouses, callbacks_1.sortFn);
    for (const [warehouseId, totalValue] of sortedWarehouses) {
        console.log(`Warehouse ${warehouseId} total value is ${totalValue}`);
    }
}
function getStockDisparity() {
    const disparityMap = (0, utils_1.calculateStockDisparity)(data_1.warehouses);
    for (const [productId, disparity] of disparityMap) {
        console.log(`Product ${productId} -->  Disparity: ${disparity}`);
    }
}
function generateWarehouseStats() {
    console.log((0, utils_1.generateMultiWarehouseReport)(data_1.warehouses, callbacks_1.formatFn));
}
generateWarehouseStats();
