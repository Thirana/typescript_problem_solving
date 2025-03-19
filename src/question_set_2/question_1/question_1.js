"use strict";
class OrderBook {
    constructor() {
        this.buyOrders = [];
        this.sellOrders = [];
    }
    // Helper function to sort buy orders (highest price, then earliest timestamp)
    sortBuyOrders() {
        this.buyOrders.sort((a, b) => b.price - a.price || a.timestamp - b.timestamp);
    }
    // Helper to sort sell orders (lowest price, then earliest timestamp)
    sortSellOrders() {
        this.sellOrders.sort((a, b) => a.price - b.price || a.timestamp - b.timestamp);
    }
    addOrder(order) {
        if (order.price < 0 || order.quantity < 0) {
            console.log(`Invalid Order! Order Id: ${order.id}`);
        }
        const ordersToMatch = order.type === "buy" ? this.sellOrders : this.buyOrders;
        const isBuy = order.type === "buy";
        let remainingQty = order.quantity;
        // edge case handling for first set of (buy or sell) orders
        if (ordersToMatch.length === 0) {
            console.log(`No matching order for the  order ${order.id} in the book`);
        }
        // matching with existing orders
        while (remainingQty > 0 && ordersToMatch.length > 0) {
            const bestMatch = ordersToMatch[0];
            // checking current order can match witch bestMarch
            const canMatch = isBuy
                ? order.price >= bestMatch.price
                : order.price <= bestMatch.price;
            if (!canMatch) {
                console.log(`No matching order for the  order ${order.id} in the book`);
                break;
            }
            const matchPrice = bestMatch.price;
            const matchQty = Math.min(remainingQty, bestMatch.quantity);
            //log
            console.log(`Matched ${order.id} with ${bestMatch.id} for ${matchQty} units at price ${matchPrice}`);
            // updating quantities
            remainingQty -= matchQty;
            bestMatch.quantity -= matchQty;
            // removing matching order from the book, if qty is 0
            if (bestMatch.quantity === 0) {
                ordersToMatch.shift();
            }
        }
        // add remaining qty to the book
        if (remainingQty > 0) {
            const newOrder = Object.assign(Object.assign({}, order), { quantity: remainingQty });
            if (isBuy) {
                this.buyOrders.push(newOrder);
                this.sortBuyOrders();
            }
            else {
                this.sellOrders.push(newOrder);
                this.sortSellOrders();
            }
        }
        // resort after matching
        if (isBuy) {
            this.sortSellOrders();
        }
        else {
            this.sortBuyOrders();
        }
    }
    getBestBid() {
        return this.buyOrders.length > 0 ? this.buyOrders[0].price : null;
    }
    getBestAsk() {
        return this.sellOrders.length > 0 ? this.sellOrders[0].price : null;
    }
    getBook() {
        return [...this.sellOrders, ...this.buyOrders];
    }
}
const book = new OrderBook();
book.addOrder({
    id: "B1",
    type: "buy",
    price: 100,
    quantity: 10,
    timestamp: 1,
});
book.addOrder({
    id: "S1",
    type: "sell",
    price: 99,
    quantity: 6,
    timestamp: 2,
});
book.addOrder({ id: "S2", type: "sell", price: 98, quantity: 8, timestamp: 3 });
book.addOrder({ id: "B2", type: "buy", price: 99, quantity: 6, timestamp: 4 });
console.log("\nCurrent Book");
console.log(book.getBook());
