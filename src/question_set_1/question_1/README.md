# Frequently Bought Together System


You are tasked with building a product recommendation feature for an e-commerce platform, similar to Amazon’s “Customers who bought this also bought” section. Given a product, you need to suggest other products that are frequently purchased together with it, based on customer order history. The suggestions should be ranked by relevance and limited to a specified number.

## Requirements
- Define a `Product` type with properties:
    - `id` (string)
    - `name` (string)
    - `price` (number)
- Define an `Order` type with properties:
    - `orderId` (string)
    - `productIds` (array of product IDs purchased together)
- Implement a function `suggestProducts(productId: string, products: Product[], orders: Order[], limit: number): Product[]` that:
    - Returns a list of suggested products that are *not* the given product itself.
    - Ranks the suggestions by:
        - The number of times a product appears in the same order as the given product (descending).
        - The price of the product (descending, as a tiebreaker assuming higher-priced items might indicate popularity or value).
    - Limits the result to the top `limit` suggestions.
- Ensure the solution is efficient for large datasets (e.g., thousands of products and millions of orders).
- Handle edge cases, such as products with no co-purchases or invalid product IDs.

## Example
Consider the following data:

```typescript
const products: Product[] = [
  { id: "P1", name: "Laptop", price: 1000 },
  { id: "P2", name: "Mouse", price: 20 },
  { id: "P3", name: "Keyboard", price: 50 },
  { id: "P4", name: "Monitor", price: 200 },
  { id: "P5", name: "Headphones", price: 80 },
];

const orders: Order[] = [
  { orderId: "O1", productIds: ["P1", "P2", "P3"] },      // Laptop, Mouse, Keyboard
  { orderId: "O2", productIds: ["P1", "P4"] },           // Laptop, Monitor
  { orderId: "O3", productIds: ["P2", "P5"] },           // Mouse, Headphones
  { orderId: "O4", productIds: ["P1", "P2", "P4"] },     // Laptop, Mouse, Monitor
  { orderId: "O5", productIds: ["P3", "P5"] },           // Keyboard, Headphones
];
```

For product `"P1"` (Laptop), the suggestions should be based on co-purchases:

- `P2` (Mouse): Appears with `P1` in orders `O1` and `O4` (2 times).
- `P4` (Monitor): Appears with `P1` in orders `O2` and `O4` (2 times).
- `P3` (Keyboard): Appears with `P1` in order `O1` (1 time).

Ranked by co-purchase count and then price:

1. `P4` (2 times, price 200)
2. `P2` (2 times, price 20)
3. `P3` (1 time, price 50)

If `limit = 2`, the function should return products `P4` and `P2`.