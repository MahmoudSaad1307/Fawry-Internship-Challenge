export type Product = {
  ad
  id: string;
  name: string;
  price: number;
  quantity: number;
  shippable?: boolean;
  shippableWeight?: number;
  expiryDate?: Date;

};