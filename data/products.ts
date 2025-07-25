import { Product } from "../models/Product";

export const products: Product[] = [
  {
    id: "p1",
    name: "cheese",
    price: 100,
    quantity: 10,
    shippable: true,
    shippableWeight: 200,
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

  // Note: I told AI model to generate the rest of the products ☺️

  {
    id: "p5",
    name: "milk",
    price: 80,
    quantity: 20,
    shippable: true,
    shippableWeight: 1000,
    expiryDate: new Date("2025-06-01"),
  },
  {
    id: "p6",
    name: "smartphone",
    price: 3500,
    quantity: 5,
    shippable: true,
    shippableWeight: 400,
  },
  {
    id: "p7",
    name: "online course voucher",
    price: 300,
    quantity: 50,
    shippable: false,
  },
  {
    id: "p8",
    name: "yogurt",
    price: 40,
    quantity: 15,
    shippable: true,
    shippableWeight: 150,
    expiryDate: new Date("2025-12-01"),
  },
  {
    id: "p9",
    name: "laptop",
    price: 7000,
    quantity: 4,
    shippable: true,
    shippableWeight: 2200,
  },
  {
    id: "p10",
    name: "e-book",
    price: 120,
    quantity: 100,
    shippable: false,
  },
];