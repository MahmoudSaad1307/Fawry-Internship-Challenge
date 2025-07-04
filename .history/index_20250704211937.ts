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

function checkout(customer: Customer, cart: Cart): void {
  if (cart.isEmpty()) {
    throw new Error("Cart is empty. Cannot proceed to checkout.");
  }

  let subtotal = 0;
  const shippableItems: { name: string; weight: number }[] = [];

  for (const item of cart.items) {
    const product = item.product;

    // Check expiry
    if (product.expiryDate && new Date() > product.expiryDate) {
      throw new Error(`${product.name} is expired and cannot be purchased.`);
    }

    // Check stock
    if (item.quantity > product.quantity) {
      throw new Error(
        `Insufficient stock for ${product.name}. Only ${product.quantity} available.`
      );
    }

    // Update stock
    product.quantity -= item.quantity;

    // Add to subtotal
    subtotal += product.price * item.quantity;

    // Add to shipping list if needed
    if (product.shippable && product.shippableWeight) {
      for (let i = 0; i < item.quantity; i++) {
        shippableItems.push({
          name: product.name,
          weight: product.shippableWeight,
        });
      }
    }
  }

  // Shipping fee flat rate (you can modify this)
  const shippingFee = shippableItems.length > 0 ? 30 : 0;
  const totalAmount = subtotal + shippingFee;

  if ((customer.balance??0) < totalAmount) {
    throw new Error("Customer does not have enough balance.");
  }

  // Deduct from customer balance
  customer.balance! -= totalAmount;

  // Send items for shipping
  if (shippableItems.length > 0) {
    ShippingService.send(shippableItems);
  }

  // Print receipt
  console.log("\n** Checkout receipt **");
  for (const item of cart.items) {
    console.log(`${item.quantity}x ${item.product.name}     ${item.product.price * item.quantity}`);
  }

  console.log("----------------------");
  console.log(`Subtotal         ${subtotal}`);
  console.log(`Shipping         ${shippingFee}`);
  console.log(`Amount           ${totalAmount}`);
  console.log(`Remaining balance: ${customer.balance}`);
}




// console.log({ product });