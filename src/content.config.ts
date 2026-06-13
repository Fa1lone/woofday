import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    author: z.string().default('Équipe Woof Day'),
    image: z.string().optional(),
    imageCredit: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const evenements = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/evenements' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    lieu: z.string(),
    type: z.enum(['grand-evenement', 'afterwork', 'atelier', 'conference', 'promenade']),
    visible: z.boolean().default(false),
    capacite: z.number().optional(),
    prix: z.string().optional(),
    image: z.string().optional(),
    inscriptionUrl: z.string().optional(),
  }),
});

export const collections = { blog, evenements };
