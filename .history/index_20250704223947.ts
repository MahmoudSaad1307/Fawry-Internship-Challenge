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
(() => {
  const cart = new Cart(products);
  try {
    cart.add("cheese", 2);   // 2 x 100 = 200
    cart.add("tv", 1);       // 1 x 2000 = 2000
    checkoutService(customers[1], cart); // Should throw (not enough balance)
  } catch (e: any) {
    console.log("Test 2 Error:", e.message);
  }
})();







// console.log(products);
