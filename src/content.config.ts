import { defineCollection } from 'astro:content'
import { glob, file } from 'astro/loaders'
import { z } from 'astro/zod'

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/data/services' }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    category: z.enum(['residential', 'commercial', 'specialty']),
    icon: z.string(),
    tagline: z.string(),
    description: z.string(),
    features: z.array(z.string()),
    process: z
      .array(
        z.object({
          step: z.number(),
          title: z.string(),
          description: z.string(),
        })
      )
      .optional(),
    startingPrice: z.number().optional(),
    priceUnit: z.string().optional(),
    featured: z.boolean().default(false),
    displayOrder: z.number(),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
  }),
})

const testimonials = defineCollection({
  loader: file('./src/data/testimonials.json'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    photo: z.string().optional(),
    text: z.string(),
    rating: z.number().min(1).max(5),
    service: z.string(),
    location: z.string().optional(),
    date: z.string().date(),
    verified: z.boolean().default(true),
    featured: z.boolean().default(false),
  }),
})

const team = defineCollection({
  loader: file('./src/data/team.json'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    role: z.string(),
    photo: z.string(),
    bio: z.string(),
    certifications: z.array(z.string()).optional(),
    yearsExperience: z.number().optional(),
    displayOrder: z.number(),
    featured: z.boolean().default(false),
  }),
})

const gallery = defineCollection({
  loader: file('./src/data/gallery.json'),
  schema: z.object({
    id: z.string(),
    before: z.string(),
    after: z.string(),
    service: z.string(),
    room: z.string(),
    description: z.string(),
    featured: z.boolean().default(false),
    displayOrder: z.number(),
  }),
})

const pricing = defineCollection({
  loader: file('./src/data/pricing.json'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    tagline: z.string(),
    price: z.number(),
    priceUnit: z.string(),
    frequency: z.string().optional(),
    features: z.array(
      z.object({
        text: z.string(),
        included: z.boolean().default(true),
      })
    ),
    highlighted: z.boolean().default(false),
    displayOrder: z.number(),
    ctaText: z.string().default('Get Started'),
    ctaUrl: z.string().default('/contact'),
  }),
})

export const collections = {
  services,
  testimonials,
  team,
  gallery,
  pricing,
}
