type Product = {
  name: String,
  price: Number,
  quantity: Number
}

function createProduct({
  name,
  price = 0,
  quantity = 1,

}: Product): Required<Product> {
  return { name, price, quantity };
}
const product = createProduct({
const p = createProduct({ name: "Apple" });


console.log({ product });