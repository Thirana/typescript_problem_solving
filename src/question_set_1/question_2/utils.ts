export type Product = {
  id: string;
  name: string;
  cost: number;
  price: number;
};

export type Customer = {
  id: string;
  discount: number;
};

export type Order = {
  id: string;
  customerId: string;
  items: { productId: string; quantity: number }[];
};

/**
 * Creates a map of productId to Product for quick lookups.
 */
export function getProductMap(products: Product[]): Map<string, Product> {
  const productMap = new Map<string, Product>();
  for (const product of products) {
    productMap.set(product.id, product);
  }

  return productMap;
}

/**
 * Creates a map of customerId to Customer for quick lookups.
 */
export function getCustomerMap(customers: Customer[]): Map<string, Customer> {
  const customerMap = new Map<string, Customer>();
  for (const customer of customers) {
    customerMap.set(customer.id, customer);
  }

  return customerMap;
}

/**
 * Calculates the profit for a single order.
 * Returns null if the order has invalid customer or product IDs.
 */
export function calculateOrderProfit(
  order: Order,
  productMap: Map<string, Product>,
  customerMap: Map<string, Customer>,
): number | null {
  const customer = customerMap.get(order.customerId);
  if (!customer) {
    return null;
  }

  let profit = 0;
  for (const item of order.items) {
    const product = productMap.get(item.productId);
    if (!product) {
      return null;
    }

    const discountPrice = product.price * (1 - customer.discount);
    profit += (discountPrice - product.cost) * item.quantity;
  }
  return profit;
}
