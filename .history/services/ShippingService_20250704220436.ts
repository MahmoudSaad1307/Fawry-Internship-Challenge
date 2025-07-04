export interface Shippable {
  getName(): string;
  getWeight(): number;
}
const shippableItems: Shippable[] = cartItems
  .filter(item => item.product.shippable)
  .flatMap(item => {
    return Array.from({ length: item.quantity }, () => ({
      getName: () => item.product.name,
      getWeight: () => item.product.shippableWeight!,
    }));
  });

export class ShippingService {
  static send(items: { name: string; weight: number }[]) {
    console.log("\n** Shipment notice **");

    const summary = new Map<string, { count: number; totalWeight: number }>();
    let totalWeight = 0;

    for (const { name, weight } of items) {
      const existing = summary.get(name);

      if (existing) {
        existing.count++;
        existing.totalWeight += weight;
      } else {
        summary.set(name, { count: 1, totalWeight: weight });
      }

      totalWeight += weight;
    }

    for (const [name, { count, totalWeight }] of summary.entries()) {
      console.log(`${count}x ${name}     ${totalWeight}g`);
    }

    console.log(`Total package weight: ${(totalWeight / 1000).toFixed(1)}kg`);
  }
}