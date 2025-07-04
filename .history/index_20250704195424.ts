type Product = {
  name: string;
  price?: number;
  quantity?: number;
  shippingFees?: number;
  shippableWeight?: number;
};
type Customer = {
  
  name: string;
  address: string;
  balance?: number
};
type Cart = {
  products: Product[];
  customer?: Customer;
  quantity: number;
};



const createProduct = ({
  name,
  price = 0,
  quantity = 1,
  shippingFees = 0,
  shippableWeight = 0,
}: Product): Required<Product> => {
  return { name, price, quantity, shippingFees, shippableWeight };
}
const product = createProduct({
  name: "Laptop",
  price: 50000,
});

console.log({ product });