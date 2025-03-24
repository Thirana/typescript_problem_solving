# Multi-Warehouse Inventory Synchronization and Analysis

You are tasked with building a utility library to manage and analyze inventory data across multiple warehouses. Each warehouse has its own inventory of products, and you need to synchronize, compare, and analyze the data to optimize stock distribution and generate detailed reports. The challenge involves handling nested data structures, performing multi-step transformations, and computing advanced statistics.

## Requirements

### Define Types

- **Product**: `{ id: string; name: string; category: string; price: number; stock: number }`
- **Warehouse**: `{ warehouseId: string; location: string; inventory: Product[] }`
- **InventoryStats**: `{ totalProducts: number; totalValue: number; warehouseCount: number; categoryStats: Record<string, { count: number; avgPrice: number; totalStock: number }> }`

### Utility Functions

- **filterWarehouseInventory**
    - **Signature**: `filterWarehouseInventory(warehouses: Warehouse[], filterFn: (product: Product, warehouse: Warehouse) => boolean): Warehouse[]`
    - Filters products within each warehouse using a callback that considers both the product and its warehouse, returning an array of warehouses with filtered inventories.

- **mergeInventories**
    - **Signature**: `mergeInventories(warehouses: Warehouse[], mergeFn: (products: Product[]) => Product[]): Product[]`
    - Combines inventories from all warehouses into a single product list, using a callback to resolve duplicates (e.g., summing stock for products with the same id).

- **sortWarehouses**
    - **Signature**: `sortWarehouses(warehouses: Warehouse[], sortFn: (a: Warehouse, b: Warehouse) => number): Warehouse[]`
    - Sorts the warehouses based on a callback (e.g., by total stock or value).

- **calculateStockDisparity**
    - **Signature**: `calculateStockDisparity(warehouses: Warehouse[]): Record<string, number>`
    - Calculates the maximum stock difference for each product id across warehouses (e.g., max stock - min stock).

- **generateMultiWarehouseReport**
    - **Signature**: `generateMultiWarehouseReport(warehouses: Warehouse[], formatFn: (stats: InventoryStats) => string): string`
    - Computes statistics across all warehouses and formats them using a callback.

### Sample Data
```typescript
export const warehouses: Warehouse[] = [
  {
    warehouseId: "W1",
    location: "New York",
    inventory: [
      {
        id: "P1",
        name: "Laptop",
        category: "Electronics",
        price: 1000,
        stock: 5,
      },
      {
        id: "P2",
        name: "Phone",
        category: "Electronics",
        price: 500,
        stock: 10,
      },
      { id: "P3", name: "T-shirt", category: "Clothing", price: 20, stock: 50 },
    ],
  },
  {
    warehouseId: "W2",
    location: "Los Angeles",
    inventory: [
      {
        id: "P1",
        name: "Laptop",
        category: "Electronics",
        price: 1000,
        stock: 10,
      },
      { id: "P4", name: "Jeans", category: "Clothing", price: 50, stock: 30 },
      { id: "P5", name: "Novel", category: "Books", price: 15, stock: 100 },
    ],
  },
  {
    warehouseId: "W3",
    location: "Chicago",
    inventory: [
      {
        id: "P2",
        name: "Phone",
        category: "Electronics",
        price: 500,
        stock: 7,
      },
      { id: "P4", name: "Jeans", category: "Clothing", price: 50, stock: 50 },
      {
        id: "P6",
        name: "Desk Chair",
        category: "Furniture",
        price: 150,
        stock: 20,
      },
      {
        id: "P7",
        name: "Watch",
        category: "Accessories",
        price: 80,
        stock: 15,
      },
    ],
  },
];

```