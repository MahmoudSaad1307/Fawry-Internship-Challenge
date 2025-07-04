import { products } from "./data/products";
import { Cart } from "./models/Cart";






const customers = [
  {
    id: "c1",
    name: "Jessie Pinkman",
    balance: 1000,
  },
  {
    id: "c2",
    name: "Walter White",
    balance: 2000,
  },
]



const cart = new Cart(products); // `products` is your full list



// console.log(products);
