import { Product, Order } from "./type";
import { products, orders } from "./data";

function suggestProducts(
  productId: string,
  products: Product[],
  orders: Order[],
  limit: number,
): Product[] {
  // Step 1: Create a map from product ID to product object
  const productMap = new Map<string, Product>();
  for (const product of products) {
    productMap.set(product.id, product);
  }

  // Verify the given product exists
  if (!productMap.has(productId)) {
    return []; // Invalid product ID
  }

  // Step 2: Count co-purchases with the given product
  const coPurchaseCount = new Map<string, number>();
  for (const order of orders) {
    // Check if the given product is in this order
    if (order.productIds.includes(productId)) {
      // Count all other products in the same order
      for (const pid of order.productIds) {
        if (pid !== productId) {
          // Exclude the given product itself
          const currentCount = coPurchaseCount.get(pid) || 0;
          coPurchaseCount.set(pid, currentCount + 1);
        }
      }
    }
  }

  // Step 3: Collect suggestions with their co-purchase count
  const suggestions: { product: Product; count: number }[] = [];
  for (const [suggestedId, count] of coPurchaseCount) {
    const suggestedProduct = productMap.get(suggestedId);
    if (suggestedProduct) {
      // Ensure the product exists
      suggestions.push({ product: suggestedProduct, count });
    }
  }

  // Step 4: Sort suggestions by co-purchase count (desc), then price (desc)
  suggestions.sort((a, b) => {
    if (a.count !== b.count) {
      return b.count - a.count; // Higher count first
    } else {
      return b.product.price - a.product.price; // Higher price first
    }
  });

  // Step 5: Return the top 'limit' suggestions
  const topSuggestions = suggestions.slice(0, limit);
  return topSuggestions.map((s) => s.product);
}

const suggestion: Product[] = suggestProducts("P1", products, orders, 2);

console.log(suggestion);
