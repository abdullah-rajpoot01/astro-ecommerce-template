import type { Category } from "@/types/categories";

import fs from "fs";
import path from "path";
import { getAllProducts } from "./products";


export function getAllCategories(): Category[] {
  try {
    const categoriesDir = path.join(process.cwd(), "src/content/categories");

    if (!fs.existsSync(categoriesDir)) {
      console.error(`Categories directory not found: ${categoriesDir}`);
      return [];
    }

    const files = fs
      .readdirSync(categoriesDir)
      .filter((file) => file.endsWith(".json"));

    return files.flatMap((file) => {
      try {
        const filePath = path.join(categoriesDir, file);
        const fileContent = fs.readFileSync(filePath, "utf-8");

        return [JSON.parse(fileContent) as Category];
      } catch (error) {
        console.error(`Failed to read category file: ${file}`, error);
        return [];
      }
    });
  } catch (error) {
    console.error("Failed to load categories:", error);
    return [];
  }
}


export interface CategoryWithCount extends Category {
  count: number;
}

export function getCategoriesWithProductCount(): CategoryWithCount[] {
  const categories = getAllCategories();
  const products = getAllProducts();

  const productCounts = new Map<string, number>();

  for (const product of products) {
    productCounts.set(
      product.category,
      (productCounts.get(product.category) ?? 0) + 1
    );
  }
console.log(productCounts)
  return categories.map((category) => ({
    ...category,
    count: productCounts.get(category.id) ?? 0,
  }));
}