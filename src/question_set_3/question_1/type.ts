export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
};

export type Warehouse = {
  warehouseId: string;
  location: string;
  inventory: Product[];
};

export interface InventoryStats {
  totalProducts: number;
  totalValue: number;
  warehouseCount: number;
  categoryStats: Record<
    string,
    { count: number; avgPrice: number; totalStock: number }
  >;
}
