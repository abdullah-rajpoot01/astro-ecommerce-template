// src/content.config.ts
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { defineCollection } from 'astro:content';

// Helper Schema: Options { [key: string]: string }
const OptionsSchema = z.record(z.string(), z.string());

// Helper Schema: Variant
const VariantSchema = z.object({
  id: z.string(),
  sku: z.string().optional(),
  price: z.number().optional(),
  comparePrice: z.number().optional(),
  stock: z.number().optional(),
  options: OptionsSchema
});

// Helper Schema: AddOn
const AddOnSchema = z.object({
  id: z.string(),
  name: z.string(),
  required: z.boolean(),
  price: z.number()
});

// Helper Schema: Specification
const SpecificationSchema = z.object({
  key: z.string(),
  value: z.string()
});

// Main Product Collection
export const productsCollection = defineCollection({
  // Use the modern glob loader to grab JSON files inside src/content/products/
  loader: glob({ pattern: '**/*.json', base: './src/content/products' }),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    category: z.string(),
    price: z.number(),
    comparePrice: z.number().optional(),
    stock: z.number().nullable().optional(),
    saleLable: z.string().optional(), // Preserved your exact typo from the interface
    images: z.array(z.string()),
    description: z.string().optional(),
    variants: z.array(VariantSchema).optional(),
    addOns: z.array(AddOnSchema).optional(),
    features: z.array(z.string()).optional(),
    specifications: z.array(SpecificationSchema).optional(),
    featured: z.boolean(),
    status: z.enum(["draft", "published"])
  })
});

