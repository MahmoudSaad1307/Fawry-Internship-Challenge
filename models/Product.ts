export type Product = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  shippable?: boolean;
  shippableWeight?: number;
  expiryDate?: Date;

};