import { products } from "./data/products";
import { Cart } from "./models/Cart";










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






// console.log({ product });