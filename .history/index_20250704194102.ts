type Product ={
  name:String,
  price:Number,
  quantity:Number
}

function createProduct({
  name,
  price = 0,
  quantity = 1,

}: Product): Required<Product> {
  return { name, price, quantity };
}
const product :crea={
  name:"Laptop",
  price:50000,
  // quantity:5
}

console.log({product});