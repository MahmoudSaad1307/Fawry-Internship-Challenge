type Product = {
  id: string;
  name: string;
  price: number;
  quantity: number;
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
    constructor(private availableProducts: Product[]) {}


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
const products: Product[] = [
  {
    id: "p1",
    name: "Cheese",
    price: 100,
    quantity: 10,
    shippable: true,
    shippableWeight: 400,
    expiryDate: new Date("2030-01-01"),
  },
  {
    id: "p2",
    name: "Biscuits",
    price: 150,
    quantity: 5,
    shippable: true,
    shippableWeight: 700,
    expiryDate: new Date("2030-01-01"),
  },
  {
    id: "p3",
    name: "TV",
    price: 2000,
    quantity: 3,
    shippable: true,
    shippableWeight: 5000,
  },
  {
    id: "p4",
    name: "Scratch Card",
    price: 50,
    quantity: 10,
    shippable: false,
  },
];
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
    let totalWeight = 0;
    const grouped: Record<string, { count: number; weight: number }> = {};

    for (const item of items) {
      if (!grouped[item.name]) {
        grouped[item.name] = { count: 0, weight: item.weight };
      }
      grouped[item.name].count++;
    }

    for (const [name, data] of Object.entries(grouped)) {
      const itemWeight = data.weight * data.count;
      console.log(`${data.count}x ${name}     ${itemWeight}g`);
      totalWeight += itemWeight;
    }

    console.log(`Total package weight: ${(totalWeight / 1000).toFixed(1)}kg`);
  }
}

function checkout(cart: Cart, customer: Customer) {



}

// console.log({ product });