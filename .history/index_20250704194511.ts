type Product = {
  name: string,
  price?: number,
  quantity?: number
  shippingFees?: number
}


function createProduct({
  name,
  price = 0,
  quantity = 1,
  shippingFees = 0,
}: Product): Required<Product> {
  return { name, price, quantity };
}
const product = createProduct({
  name: "Laptop",
  price: 50000,
});

console.log({ product });