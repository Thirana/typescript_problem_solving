import { warehouses } from "./data";
import { filterFn, mergeFn, sortFn, formatFn } from "./callbacks";
import {
  filterWarehouseInventory,
  mergeInventories,
  sortWarehouses,
  calculateStockDisparity,
  generateMultiWarehouseReport,
} from "./utils";

function executeFilteredWarehouses() {
  const stockQty: number = 20;
  const warehouseId: string = "W1";

  const filteredWarehouses = filterWarehouseInventory(
    warehouses,
    stockQty,
    warehouseId,
    filterFn,
  );

  const filteredProducts = filteredWarehouses.map((w) =>
    w.inventory.map((p) => p.name),
  );

  console.log(
    `Filtered inventory products for warehouse ${warehouseId} (stock > ${stockQty})\n`,
  );

  console.log(filteredProducts);
}

function executeMergeInventories() {
  const totalInventories = mergeInventories(warehouses, mergeFn);
  console.log("Total Inventories:\n", totalInventories);
}

function executeSortWarehouses() {
  const sortedWarehouses = sortWarehouses(warehouses, sortFn);

  for (const [warehouseId, totalValue] of sortedWarehouses) {
    console.log(`Warehouse ${warehouseId} total value is ${totalValue}`);
  }
}

function getStockDisparity() {
  const disparityMap = calculateStockDisparity(warehouses);
  for (const [productId, disparity] of disparityMap) {
    console.log(`Product ${productId} -->  Disparity: ${disparity}`);
  }
}

function generateWarehouseStats() {
  console.log(generateMultiWarehouseReport(warehouses, formatFn));
}

generateWarehouseStats();
