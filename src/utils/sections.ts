import { defineCollection } from 'astro:content';
import { z } from 'astro/zod'
import { glob } from 'astro/loaders';

const sections = defineCollection({
  // This matches every JSON file inside the sections folder
  loader: glob({ pattern: '**/[^_]*.json', base: './src/content/sections' }),
  // Use unknown because hero.json and footer.json won't share the same fields
  schema: z.unknown(), 
});

export const collections = { sections };
