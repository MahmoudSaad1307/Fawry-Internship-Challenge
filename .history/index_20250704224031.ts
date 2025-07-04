import { products } from "./data/products";
import { Cart } from "./models/Cart";
import { Customer } from "./models/Customer";
import { checkoutService } from "./services/CheckoutService";


// const id = crypto.randomUUID();
// console.log(id); 



const customers: Customer[] = [
  {
    id: "c1",
    name: "Walter White",
    balance: 2000,
  },
  {
    id: "c2",
    name: "Jessie Pinkman",
    balance: 1000,
  },
  {
    id: "c3",
    name: "Saul Goodman",
    balance: 500,
  },
]
 const cart = new Cart(products);
  try {
    cart.add("scratch card", 2); // 2 x 50 = 100
    checkoutService(customers[0], cart);
  } catch (e: any) {
    console.log("Test 1 Error:", e.message);







// console.log(products);
