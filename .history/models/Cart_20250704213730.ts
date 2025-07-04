import { Product } from "./Product";
import { ProductInCart } from "./ProductInCart";

export class Cart {
  items: ProductInCart[] = [];
  constructor(private availableProducts: Product[]) { }


  add(productName: string, quantity: number): void {
    const product = this.availableProducts.find((item) => item.name === productName.toLocaleLowerCase().trim);
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