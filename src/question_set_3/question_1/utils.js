"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateStockDisparity = void 0;
exports.filterWarehouseInventory = filterWarehouseInventory;
exports.mergeInventories = mergeInventories;
exports.sortWarehouses = sortWarehouses;
exports.generateMultiWarehouseReport = generateMultiWarehouseReport;
// Function to filter out inventory products based on given logic
// Filtering logic is based on callback function provided (filterFn)
// following style is function declaration
function filterWarehouseInventory(warehouses, stockQty, warehouseId, filterFn) {
    const filteredWareHouses = [];
    for (const warehouse of warehouses) {
        const filteredInventory = warehouse.inventory.filter((product) => filterFn(product, warehouse, stockQty, warehouseId));
        if (filteredInventory.length > 0) {
            filteredWareHouses.push(Object.assign(Object.assign({}, warehouse), { inventory: filteredInventory }));
        }
    }
    return filteredWareHouses;
}
//function to merge inventory products based on product id
function mergeInventories(warehouses, mergeFn) {
    const allProducts = [];
    for (const warehouse of warehouses) {
        for (const product of warehouse.inventory) {
            allProducts.push(Object.assign({}, product));
        }
    }
    return mergeFn(allProducts);
}
//function to sort warehouses
function sortWarehouses(warehouses, sortFn) {
    const sortedWarehouses = [...warehouses].sort(sortFn);
    const sortedValues = new Map();
    for (const warehouse of sortedWarehouses) {
        const totalValue = warehouse.inventory.reduce((sum, product) => sum + product.price * product.stock, 0);
        sortedValues.set(warehouse.warehouseId, totalValue);
    }
    return sortedValues;
}
// function to calculate stock disparity
// following style is function expression
const calculateStockDisparity = function (warehouses) {
    const stockByProducts = {};
    for (const warehouse of warehouses) {
        for (const product of warehouse.inventory) {
            if (!stockByProducts[product.id]) {
                stockByProducts[product.id] = [];
            }
            stockByProducts[product.id].push(product.stock);
        }
    }
    const disparityMap = new Map();
    for (const productId in stockByProducts) {
        const stocks = stockByProducts[productId];
        const maxStock = Math.max(...stocks);
        const minStock = Math.min(...stocks);
        let disparity = 0;
        // when product is available in only one warehouse
        if (maxStock === minStock) {
            disparity = minStock;
        }
        else {
            disparity = maxStock - minStock;
        }
        disparityMap.set(productId, disparity);
    }
    return disparityMap;
};
exports.calculateStockDisparity = calculateStockDisparity;
// Function to generate warehouse reports
function generateMultiWarehouseReport(warehouses, formatFn) {
    let totalProducts = 0;
    let totalValue = 0;
    const categoryStats = {};
    for (const warehouse of warehouses) {
        for (const product of warehouse.inventory) {
            totalProducts += 1;
            totalValue += product.price * product.stock;
            if (!categoryStats[product.category]) {
                categoryStats[product.category] = {
                    count: 0,
                    sumPrice: 0,
                    totalStock: 0,
                };
            }
            categoryStats[product.category].count += 1;
            categoryStats[product.category].sumPrice += product.price;
            categoryStats[product.category].totalStock += product.stock;
        }
    }
    const formattedCategoryStats = {};
    for (const category in categoryStats) {
        const { count, sumPrice, totalStock } = categoryStats[category];
        formattedCategoryStats[category] = {
            count,
            avgPrice: count > 0 ? sumPrice / count : 0,
            totalStock,
        };
    }
    const stats = {
        totalProducts,
        totalValue,
        warehouseCount: warehouses.length,
        categoryStats: formattedCategoryStats,
    };
    return formatFn(stats);
}
