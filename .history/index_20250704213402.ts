import { products } from "./data/products";
import { Cart } from "./models/Cart";
import { Customer } from "./models/Customer";
import { checkoutService } from "./services/CheckoutService";






const customers : Customer[] = [
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
]
const cart = new Cart(products);
try {
  cart.add("cheese", 2);
  cart.add("tv", 3);
  cart.add("scratchCard", 1);
  checkoutService(customers[0], cart); 
  
} catch (error) {
  
}






// console.log(products);
