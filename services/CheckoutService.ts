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

  const shippableItems: Shippable[] = cart.items
    .filter(item => item.product.shippable)
    .flatMap(item =>
      Array.from({ length: item.quantity }, () => ({
        getName: () => item.product.name,
        getWeight: () => item.product.shippableWeight!,
      }))
    );

  for (const item of cart.items) {
    const product = item.product;

    product.quantity -= item.quantity;

    subtotal += product.price * item.quantity;
  }
  const shippingFee = shippableItems.length > 0 ? 30 : 0;
  const totalAmount = subtotal + shippingFee;

  if ((customer.balance ?? 0) < totalAmount) {
    throw new Error("Customer does not have enough balance.");
  }

  customer.balance! -= totalAmount;

  if (shippableItems.length > 0) {
    ShippingService.send(
      shippableItems.map(i => ({
        name: i.getName(),
        weight: i.getWeight(),
      }))
    );
  }

  console.log("\n** Checkout receipt **");
  for (const item of cart.items) {
    console.log(`${item.quantity}x ${item.product.name}     ${item.product.price * item.quantity}`);
  }

  console.log("----------------------");
  console.log(`Subtotal         ${subtotal}`);
  console.log(`Shipping         ${shippingFee}`);
  console.log(`Amount           ${totalAmount}`);
  console.log(`Remaining balance: ${customer.balance}`);
};
