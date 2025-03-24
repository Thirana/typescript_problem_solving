import { Product, Warehouse, InventoryStats } from "./type";

// callback function for util function -> filterWarehouseInventory
export function filterFn(
  product: Product,
  warehouse: Warehouse,
  stockQty: number,
  warehouseId: string,
): boolean {
  return product.stock > stockQty && warehouse.warehouseId === warehouseId;
}

// callback function for util function -> mergeInventories
export function mergeFn(products: Product[]): Product[] {
  const productMap: Record<string, Product> = {};

  for (const product of products) {
    if (productMap[product.id]) {
      productMap[product.id].stock += product.stock;
    } else {
      productMap[product.id] = { ...product };
    }
  }

  return Object.values(productMap);
}

// callback function for util function -> sortWarehouses
// Sorts warehouses by total inventory value in descending order
export function sortFn(a: Warehouse, b: Warehouse): number {
  const valueA = a.inventory.reduce(
    (sum, product) => sum + product.price * product.stock,
    0,
  );

  const valueB = b.inventory.reduce(
    (sum, product) => sum + product.price * product.stock,
    0,
  );

  return valueB - valueA;
}

// Callback for generateMultiWarehouseReport: Formats inventory stats into a readable report
export function formatFn(stats: InventoryStats): string {
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
