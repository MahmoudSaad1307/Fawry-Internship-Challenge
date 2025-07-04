type Product = {
  id: string;
  name: string;
  price?: number;
  quantity?: number;
  shippingFees?: number;
  shippableWeight?: number;
};
type Product = {
  
  quantity: number;
  shippable?: boolean;
  weight?: number; // in grams
  expiryDate?: Date;
};

type Customer = {
  id: string;
  name: string;
  address: string;
  balance?: number;
};
type Cart = {
  add:(product: Product, quantity: number) => void;
  cartId: string;
  products: Product[];
  // customerId?: string;
  quantity: number;
};
const cart: Cart = {
  cartId: "cart-001",
  products: [],
  quantity: 0,
  // customerId: "user-123",

  add(product: Product, quantity: number) { 
    // Add the product to the list
    this.products.push(product);

    // Update total quantity
    this.quantity += quantity;
  }
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


function checkout(cart: Cart, customer: Customer) {



}
  
console.log({ product });