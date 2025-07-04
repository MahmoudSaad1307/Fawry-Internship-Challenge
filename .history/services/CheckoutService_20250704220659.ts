import { Cart } from "../models/Cart";
import { Customer } from "../models/Customer";
import { ShippingService } from "./ShippingService";
export interface Shippable {
  getName(): string;
  getWeight(): number;
}



export const checkoutService = (customer: Customer, cart: Cart): void => {
  if (cart.isEmpty()) {
    throw new Error("Cart is empty. Cannot proceed to checkout.");
  }

  let subtotal = 0;
const shippableItems: Shippable[] = cart.itemstems
  .filter(item => item.product.shippable)
  .flatMap(item => {
    return Array.from({ length: item.quantity }, () => ({
      getName: () => item.product.name,
      getWeight: () => item.product.shippableWeight!,
    }));
  });
  for (const item of cart.items) {
    const product = item.product;

    product.quantity -= item.quantity;

    // Add to subtotal
    subtotal += product.price * item.quantity;

    // Add to shipping list if needed
    if (product.shippable && product.shippableWeight) {
      for (let i = 0; i < item.quantity; i++) {
        shippableItems.push({
          name: product.name,
          weight: product.shippableWeight,
        });
      }
    }
  }

  // Shipping fee flat rate (you can modify this)
  const shippingFee = shippableItems.length > 0 ? 30 : 0;
  const totalAmount = subtotal + shippingFee;

  if ((customer.balance ?? 0) < totalAmount) {
    throw new Error("Customer does not have enough balance.");
  }

  // Deduct from customer balance
  customer.balance! -= totalAmount;

  // Send items for shipping
  if (shippableItems.length > 0) {
    ShippingService.send(shippableItems);
  }

  // Print receipt
  console.log("\n** Checkout receipt **");
  for (const item of cart.items) {
    console.log(`${item.quantity}x ${item.product.name}     ${item.product.price * item.quantity}`);
  }

  console.log("----------------------");
  console.log(`Subtotal         ${subtotal}`);
  console.log(`Shipping         ${shippingFee}`);
  console.log(`Amount           ${totalAmount}`);
  console.log(`Remaining balance: ${customer.balance}`);
}
