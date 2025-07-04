import { ProductInCart } from "./models/ProductInCart";
import { products } from "./services/data/products";








class Cart {
  items: ProductInCart[] = [];
  constructor(private availableProducts: Product[]) { }


  add(productName: string, quantity: number): void {
    const product = this.availableProducts.find((item) => item.name === productName);
    if (!product) {
      throw new Error(`Product ${productName} not found.`);
    }
    if (product.expiryDate && new Date() > product.expiryDate) {
      throw new Error(`${product.name} is expired.`);
    }
    if (quantity > product.quantity) {
      throw new Error(
        `Cannot add ${quantity}x ${product.name}: only ${product.quantity} in stock.`
      );
    }

    const existing = this.items.find((item) => item.product.id === product.id);
    if (existing) {
      const totalQuantity = existing.quantity + quantity;
      if (totalQuantity > product.quantity) {
        throw new Error(
          `Total quantity for ${product.name} exceeds available stock.`
        );
      }
      existing.quantity += quantity;
    } else {
      this.items.push({ product, quantity });
    }
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}

const cart = new Cart(products); // `products` is your full list



// const createProduct = ({
//   name,
//   price = 0,
//   quantity = 1,
//   shippingFees = 0,
//   shippableshippableWeight = 0,
// }: Product): Required<Product> => {
//   return { name, price, quantity, shippingFees, shippableshippableWeight };
// }
// const product = createProduct({
//   name: "Laptop",
//   price: 50000,
// });
class ShippingService {
  static send(items: { name: string; weight: number }[]) {
    console.log("\n** Shipment notice **");

    const summary = new Map<string, { count: number; totalWeight: number }>();
    let totalWeight = 0;

    for (const { name, weight } of items) {
      const existing = summary.get(name);

      if (existing) {
        existing.count++;
        existing.totalWeight += weight;
      } else {
        summary.set(name, { count: 1, totalWeight: weight });
      }

      totalWeight += weight;
    }

    for (const [name, { count, totalWeight }] of summary.entries()) {
      console.log(`${count}x ${name}     ${totalWeight}g`);
    }

    console.log(`Total package weight: ${(totalWeight / 1000).toFixed(1)}kg`);
  }
}





// console.log({ product });