// src/content.config.ts

import { productsCollection } from "./collection-config/products";

// Astro scans this exact object to build the internal type engine!
export const collections = {
  products: productsCollection
};
