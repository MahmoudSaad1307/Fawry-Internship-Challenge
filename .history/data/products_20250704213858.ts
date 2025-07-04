import { Product } from "../models/Product";

export const products: Product[] = [
  {
    id: "p1",
    name: "cheese",
    price: 100,
    quantity: 10,
    shippable: true,
    shippableWeight: 400,
    expiryDate: new Date("2030-01-01"),
  },
  {
    id: "p2",
    name: "biscuits",
    price: 150,
    quantity: 5,
    shippable: true,
    shippableWeight: 700,
    expiryDate: new Date("2030-01-01"),
  },
  {
    id: "p3",
    name: "tv",
    price: 2000,
    quantity: 3,
    shippable: true,
    shippableWeight: 5000,
  },
  {
    id: "p4",
    name: "scratch card",
    price: 50,
    quantity: 10,
    shippable: false,
  },
];