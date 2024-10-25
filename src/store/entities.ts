import { z } from 'zod';

export const category = z.object({
  id: z.string().readonly(),
  title: z.string(),
  colour: z.string()
});

export type Category = z.infer<typeof category>;

export const task = z.object({
  id: z.string().readonly(),
  done: z.boolean().optional(),
  title: z.string()
});

export type Task = z.infer<typeof task>;

export const card = z.object({
  id: z.string().readonly(),
  title: z.string(),
  description: z.string().optional(),
  tasks: z.array(z.string()), // Foreign keys
  categories: z.array(z.string()) // Foreign keys
});

export type Card = z.infer<typeof card>;

export const lane = z.object({
  id: z.string().readonly(),
  title: z.string(),
  cards: z.array(z.string()) // Foreign keys
});

export type Lane = z.infer<typeof lane>;

export const board = z.object({
  id: z.string().readonly(),
  title: z.string(),
  lanes: z.array(z.string()) // Foreign keys
});

export type Board = z.infer<typeof board>;
