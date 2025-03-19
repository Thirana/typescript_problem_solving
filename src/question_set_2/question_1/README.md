# Real-Time Stock Trading Order Book

## Problem Statement
You’re tasked with building a core component of a stock trading platform: the **order book**. An order book maintains a list of **buy and sell orders** for a stock, matches them in real-time, and updates the state efficiently.

Orders must be processed in a **price-time priority** (highest buy price or lowest sell price first, with earlier orders taking precedence within the same price).

## Requirements

### Define TypeScript Types
Define TypeScript types for `Order`, including properties like:
- **order ID**
- **type** (buy/sell)
- **price**
- **quantity**
- **timestamp**

### Implement `OrderBook` Class
Implement a class `OrderBook` with the following methods:

- `addOrder(order: Order)`:
    - Add a new order and attempt to match it with existing orders.

- `getBestBid()`:
    - Return the **highest buy price** currently in the book (or `null` if none).

- `getBestAsk()`:
    - Return the **lowest sell price** currently in the book (or `null` if none).

## Matching Rules

- A **buy order** matches with a **sell order** if the **buy price** is **greater than or equal to** the **sell price**.
- Matches occur at the **sell order’s price** (if the buy order’s price is higher).
- **Partially filled orders** remain in the book with their **remaining quantity**.
- Orders are prioritized by **price**:
    - Highest **buy** price first.
    - Lowest **sell** price first.
    - If prices are the same, earlier orders are processed first.

## Additional Considerations

- Ensure the solution is **efficient** for **high-frequency trading** (thousands of orders per second).
- Handle **edge cases** like:
    - **Empty order books**.
    - **No matches** available.
    - **Invalid orders**.

##  Example input and output
```typescript
const orderBook = new OrderBook();

orderBook.addOrder({ id: "B1", type: "buy", price: 100, quantity: 10, timestamp: 1 });
orderBook.addOrder({ id: "S1", type: "sell", price: 99, quantity: 6, timestamp: 2 });
orderBook.addOrder({ id: "S2", type: "sell", price: 98, quantity: 8, timestamp: 3 });
orderBook.addOrder({ id: "B2", type: "buy", price: 99, quantity: 6, timestamp: 4 });

console.log("\nCurrent Book");
console.log(book.getBook());
```

```text
No matching order for the  order B1 in the book
Matched S1 with B1 for 6 units at price 100
Matched S2 with B1 for 4 units at price 100
Matched B2 with S2 for 4 units at price 98

Current Book
[ { id: 'B2', type: 'buy', price: 99, quantity: 2, timestamp: 4 } ]

```