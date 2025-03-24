import { Product, Warehouse, InventoryStats } from "./type";

// Function to filter out inventory products based on given logic
// Filtering logic is based on callback function provided (filterFn)
// following style is function declaration
export function filterWarehouseInventory(
  warehouses: Warehouse[],
  stockQty: number,
  warehouseId: string,
  filterFn: (
    product: Product,
    warehouse: Warehouse,
    stockQty: number,
    warehouseId: string,
  ) => boolean,
): Warehouse[] {
  const filteredWareHouses: Warehouse[] = [];

  for (const warehouse of warehouses) {
    const filteredInventory = warehouse.inventory.filter((product) =>
      filterFn(product, warehouse, stockQty, warehouseId),
    );

    if (filteredInventory.length > 0) {
      filteredWareHouses.push({ ...warehouse, inventory: filteredInventory });
    }
  }

  return filteredWareHouses;
}

//function to merge inventory products based on product id
export function mergeInventories(
  warehouses: Warehouse[],
  mergeFn: (products: Product[]) => Product[],
): Product[] {
  const allProducts: Product[] = [];

  for (const warehouse of warehouses) {
    for (const product of warehouse.inventory) {
      allProducts.push({ ...product });
    }
  }

  return mergeFn(allProducts);
}

//function to sort warehouses
export function sortWarehouses(
  warehouses: Warehouse[],
  sortFn: (a: Warehouse, b: Warehouse) => number,
): Map<string, number> {
  const sortedWarehouses = [...warehouses].sort(sortFn);

  const sortedValues = new Map<string, number>();

  for (const warehouse of sortedWarehouses) {
    const totalValue = warehouse.inventory.reduce(
      (sum, product) => sum + product.price * product.stock,
      0,
    );
    sortedValues.set(warehouse.warehouseId, totalValue);
  }

  return sortedValues;
}

// function to calculate stock disparity
// following style is function expression
export const calculateStockDisparity = function (
  warehouses: Warehouse[],
): Map<string, number> {
  const stockByProducts: Record<string, number[]> = {};

  for (const warehouse of warehouses) {
    for (const product of warehouse.inventory) {
      if (!stockByProducts[product.id]) {
        stockByProducts[product.id] = [];
      }
      stockByProducts[product.id].push(product.stock);
    }
  }

  const disparityMap = new Map<string, number>();
  for (const productId in stockByProducts) {
    const stocks = stockByProducts[productId];
    const maxStock = Math.max(...stocks);
    const minStock = Math.min(...stocks);
    let disparity: number = 0;
    // when product is available in only one warehouse

    if (maxStock === minStock) {
      disparity = minStock;
    } else {
      disparity = maxStock - minStock;
    }

    disparityMap.set(productId, disparity);
  }

  return disparityMap;
};

// Function to generate warehouse reports
export function generateMultiWarehouseReport(
  warehouses: Warehouse[],
  formatFn: (stats: InventoryStats) => string,
): string {
  let totalProducts = 0;
  let totalValue = 0;
  const categoryStats: Record<
    string,
    { count: number; sumPrice: number; totalStock: number }
  > = {};

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

  const formattedCategoryStats: Record<
    string,
    { count: number; avgPrice: number; totalStock: number }
  > = {};
  for (const category in categoryStats) {
    const { count, sumPrice, totalStock } = categoryStats[category];
    formattedCategoryStats[category] = {
      count,
      avgPrice: count > 0 ? sumPrice / count : 0,
      totalStock,
    };
  }

  const stats: InventoryStats = {
    totalProducts,
    totalValue,
    warehouseCount: warehouses.length,
    categoryStats: formattedCategoryStats,
  };

  return formatFn(stats);
}
