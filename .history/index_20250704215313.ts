import { products } from "./data/products";
import { Cart } from "./models/Cart";
import { Customer } from "./models/Customer";
import { checkoutService } from "./services/CheckoutService";


const id = crypto.randomUUID();
console.log(id); //



const customers: Customer[] = [
  {
    id: "c1",
    name: "Walter White",
    balance: 50000,
  },
  {
    id: "c2",
    name: "Jessie Pinkman",
    balance: 1000,
  },
]
const cart = new Cart(products);
try {
  cart.add("cheese", 2);
  cart.add("bisc", 1)
  // cart.add("tv", 3);
  // cart.add("scratch Card   ", 1);
  checkoutService(customers[0], cart);

} catch (error: any) {
  console.log(error.message);
}






// console.log(products);
