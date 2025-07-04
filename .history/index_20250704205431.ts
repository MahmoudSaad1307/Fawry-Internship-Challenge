type Product = {
  id: string;
  name: string;
  price?: number;
  quantity?: number;
  shippable?: boolean;
  shippableWeight?: number;
  expiryDate?: Date;

};

type ProductInCart = {
  product: Product;
  quantity: number;
};
type Customer = {
  id: string;
  name: string;
  balance?: number;
};



class Cart {
  items: ProductInCart[] = [];

  add(productName: string, quantity: number): void {
    const product = this.items.find((item) => item.product.name === productName);
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


// const createProduct = ({
//   name,
//   price = 0,
//   quantity = 1,
//   shippingFees = 0,
//   shippableWeight = 0,
// }: Product): Required<Product> => {
//   return { name, price, quantity, shippingFees, shippableWeight };
// }
// const product = createProduct({
//   name: "Laptop",
//   price: 50000,
// });


function checkout(cart: Cart, customer: Customer) {



}

// console.log({ product });