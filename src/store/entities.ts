import { z } from 'zod';

export const card = z.object({
  id: z.string().readonly(),
  title: z.string(),
  lane: z.string()
});

export type Card = z.infer<typeof card>;

export const lane = z.object({
  id: z.string().readonly(),
  title: z.string(),
  board: z.string()
});

export type Lane = z.infer<typeof lane>;

export const board = z.object({
  id: z.string().readonly(),
  title: z.string()
});

export type Board = z.infer<typeof board>;
