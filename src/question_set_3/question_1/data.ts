import { Warehouse } from "./type";

export const warehouses: Warehouse[] = [
  {
    warehouseId: "W1",
    location: "New York",
    inventory: [
      {
        id: "P1",
        name: "Laptop",
        category: "Electronics",
        price: 1000,
        stock: 5,
      },
      {
        id: "P2",
        name: "Phone",
        category: "Electronics",
        price: 500,
        stock: 10,
      },
      { id: "P3", name: "T-shirt", category: "Clothing", price: 20, stock: 50 },
    ],
  },
  {
    warehouseId: "W2",
    location: "Los Angeles",
    inventory: [
      {
        id: "P1",
        name: "Laptop",
        category: "Electronics",
        price: 1000,
        stock: 10,
      },
      { id: "P4", name: "Jeans", category: "Clothing", price: 50, stock: 30 },
      { id: "P5", name: "Novel", category: "Books", price: 15, stock: 100 },
    ],
  },
  {
    warehouseId: "W3",
    location: "Chicago",
    inventory: [
      {
        id: "P2",
        name: "Phone",
        category: "Electronics",
        price: 500,
        stock: 7,
      },
      { id: "P4", name: "Jeans", category: "Clothing", price: 50, stock: 50 },
      {
        id: "P6",
        name: "Desk Chair",
        category: "Furniture",
        price: 150,
        stock: 20,
      },
      {
        id: "P7",
        name: "Watch",
        category: "Accessories",
        price: 80,
        stock: 15,
      },
    ],
  },
  {
    warehouseId: "W4",
    location: "Houston",
    inventory: [
      { id: "P3", name: "T-shirt", category: "Clothing", price: 20, stock: 40 },
      {
        id: "P8",
        name: "Coffee Maker",
        category: "Appliances",
        price: 60,
        stock: 12,
      },
      {
        id: "P9",
        name: "Headphones",
        category: "Electronics",
        price: 120,
        stock: 25,
      },
    ],
  },
];
