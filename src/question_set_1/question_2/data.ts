import { Product, Customer, Order } from "./utils";

export const products: Product[] = [
  { id: "P1", name: "Phone", cost: 200, price: 300 },
  { id: "P2", name: "Case", cost: 5, price: 20 },
];

export const customers: Customer[] = [
  { id: "C1", discount: 0.1 }, // 10% discount
  { id: "C2", discount: 0.0 }, // No discount
];

export const orders: Order[] = [
  {
    id: "O1",
    customerId: "C1",
    items: [
      { productId: "P1", quantity: 2 },
      { productId: "P2", quantity: 1 },
    ],
  },
  {
    id: "O2",
    customerId: "C2",
    items: [{ productId: "P1", quantity: 1 }],
  },
  {
    id: "O3",
    customerId: "C1",
    items: [
      { productId: "P3", quantity: 1 }, // Invalid product ID
    ],
  },
];
