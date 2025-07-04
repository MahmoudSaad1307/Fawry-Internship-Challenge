import { products } from "./data/products";
import { Cart } from "./models/Cart";






const customers = [
  {
    id: "c1",
    name: "Walter White",
    balance: 2000,
  },
  {
    id: "c1",
    name: "Jessie Pinkman",
    balance: 1000,
  },
]



const cart = new Cart(products); // `products` is your full list



// console.log(products);
