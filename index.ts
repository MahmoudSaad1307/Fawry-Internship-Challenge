import { products } from "./data/products";
import { Cart } from "./models/Cart";
import { Customer } from "./models/Customer";
import { checkoutService } from "./services/CheckoutService";

const customers: Customer[] = [
  { id: "c1", name: "Walter White", balance: 2000 },
  { id: "c2", name: "Jessie Pinkman", balance: 1000 },
  { id: "c3", name: "Saul Goodman", balance: 500 },
];

// avoid modifying the original list
function cloneProducts() {
  return products.map(p => ({ ...p }));
}

// ----------- TEST CASES -----------

// ✅ Test 1: Simple purchase no shipping
(() => {
  console.log("Test 1:")

  const cart = new Cart(cloneProducts());
  try {
    cart.add("scratch card", 2);
    checkoutService(customers[0], cart); 
  } catch (e: any) {
    console.log("❌", e.message);
  }
})();

// ✅ Test 2: Buying shipping items
(() => {
  console.log("\nTest 2:")

  const cart = new Cart(cloneProducts());
  try {
    cart.add("cheese", 2);   
    cart.add("biscuits", 1); 
    checkoutService(customers[1], cart); 
  } catch (e: any) {
    console.log("❌", e.message);
  }
})();

(() => {
  console.log("\nTest 3:")

  const cart = new Cart(cloneProducts());
  try {
    cart.add("tv", 100);
    checkoutService(customers[0], cart);
  } catch (e: any) {
    console.log("❌", e.message); 
  }
})();

// ❌ Test 4: Expired item 
(() => {
  console.log("\nTest 4:")

  const expiredProducts = cloneProducts();
  const milk = expiredProducts.find(p => p.name === "milk");
  if (milk) milk.expiryDate = new Date("2000-01-01");

  const cart = new Cart(expiredProducts);
  try {
    cart.add("milk", 1);
    checkoutService(customers[0], cart);
  } catch (e: any) {
    console.log("❌", e.message); 
  }
})();

// ❌ Test 5: Insufficient balance
(() => {
  console.log("\nTest 5:")

  const cart = new Cart(cloneProducts());
  try {
    cart.add("laptop", 1); 
    checkoutService(customers[2], cart); 
  } catch (e: any) {
    console.log("❌", e.message); 
  }
})();

// ❌ Test 6: Empty cart
(() => {
  console.log("\nTest 6:")

  const cart = new Cart(cloneProducts());
  try {
    checkoutService(customers[0], cart);
  } catch (e: any) {
    console.log("❌", e.message); 
  }
})();


