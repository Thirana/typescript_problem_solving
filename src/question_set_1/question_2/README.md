# Customer Order Profit Analysis

You’re working on a system for an e-commerce platform that analyzes customer orders to calculate profitability. Each order includes products purchased, their quantities, and the customer’s discount level. Your task is to calculate the total profit for each customer across all their orders, factoring in product costs, selling prices, and discounts.

## Requirements

Define the following types:

- **Product**: `{ id: string; name: string; cost: number; price: number; }` (cost is what the company pays, price is what the customer pays before discounts)
- **Customer**: `{ id: string; discount: number; }` (discount is a percentage between 0 and 1, e.g., 0.1 for 10%)
- **Order**: `{ id: string; customerId: string; items: { productId: string; quantity: number }[]; }`

Implement a function `calculateCustomerProfits(orders: Order[], products: Product[], customers: Customer[]): { customerId: string; totalProfit: number }[]` that:

- For each customer, computes the total profit from all their orders.
- Profit for an order is calculated as:
    - `sum((price * (1 - discount) - cost) * quantity)` across all items in the order.
- Rounds the final profit to 2 decimal places.
- Skips orders with invalid customer or product IDs (i.e., not found in the provided arrays).
- Keep the solution scalable and organized using utility functions.

## Example
```typescript
const products: Product[] = [
  { id: "P1", name: "Phone", cost: 200, price: 300 },
  { id: "P2", name: "Case", cost: 5, price: 20 },
];

const customers: Customer[] = [
  { id: "C1", discount: 0.1 }, // 10% discount
  { id: "C2", discount: 0.0 }, // No discount
];

const orders: Order[] = [
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
    items: [
      { productId: "P1", quantity: 1 },
    ],
  },
  {
    id: "O3",
    customerId: "C1",
    items: [
      { productId: "P3", quantity: 1 }, // Invalid product ID
    ],
  },
];

const profits = calculateCustomerProfits(orders, products, customers);
console.log(profits);
```

**expected output**
```text
[
  { customerId: 'C1', totalProfit: 153 },
  { customerId: 'C2', totalProfit: 100 }
]

```