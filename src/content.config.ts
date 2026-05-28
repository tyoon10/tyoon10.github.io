import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const writings = defineCollection({
  loader: glob({ pattern: '**/index.{md,mdx}', base: "./src/content/writings" }), // Target only main index files
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    featured: z.boolean().default(false),
    coverImage: image().optional(),
    tags: z.array(z.string()).default([]),
    links: z.array(z.object({
      name: z.string(),
      url: z.string(),
      icon: z.string().optional()
    })).default([])
  })
});

const projects = defineCollection({
  loader: glob({ pattern: '**/index.{md,mdx}', base: "./src/content/projects" }), // Target only main index files
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    featured: z.boolean().default(false),
    coverImage: image().optional(),
    tags: z.array(z.string()).default([]),
    links: z.array(z.object({
      name: z.string(),
      url: z.string(),
      icon: z.string().optional()
    })).default([])
  })
});

export const collections = {
  writings,
  projects
};
