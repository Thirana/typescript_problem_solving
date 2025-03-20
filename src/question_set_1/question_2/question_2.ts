import {
  Product,
  Customer,
  Order,
  getProductMap,
  getCustomerMap,
  calculateOrderProfit,
} from "./utils";

import { products, customers, orders } from "./data";

interface CustomerProfit {
  customerId: string;
  totalProfit: number;
}

function calculateCustomerProfits(
  orders: Order[],
  products: Product[],
  customers: Customer[],
): CustomerProfit[] {
  const productMap = getProductMap(products);
  const customerMap = getCustomerMap(customers);

  const profitByCustomers = new Map<string, number>();

  for (const order of orders) {
    const profit = calculateOrderProfit(order, productMap, customerMap);
    if (profit === null) {
      continue;
    }
    const currentProfit = profitByCustomers.get(order.customerId) || 0;
    profitByCustomers.set(order.customerId, currentProfit + profit);
  }

  //converting to an array and rounding off the profits
  const result: CustomerProfit[] = [];

  for (const [customerId, totalProfit] of profitByCustomers) {
    result.push({
      customerId: customerId,
      totalProfit: Number(totalProfit.toFixed(2)),
    });
  }

  return result;
}

const profits = calculateCustomerProfits(orders, products, customers);
console.log(profits);
