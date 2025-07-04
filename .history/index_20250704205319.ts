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
type Cart = {
  add: (product: Product, quantity: number) => void;
  cartId: string;
  products: Product[];
  // customerId?: string;
  quantity: number;
};






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

console.log({ product });