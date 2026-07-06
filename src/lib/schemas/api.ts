import { z } from "zod";

export const progressUpdateSchema = z.object({
  moduleId: z.string().uuid(),
  completed: z.boolean(),
  score: z.number().int().min(0).max(100).optional(),
});

export const generateSpeechSchema = z.object({
  text: z.string().min(1).max(5000),
  voiceId: z.string().optional(),
  model: z.string().optional(),
});

export const generateImageSchema = z.object({
  prompt: z.string().min(1).max(2000),
  aspectRatio: z.enum(["1:1", "16:9", "4:3"]).optional(),
});

export const generateTextSchema = z.object({
  prompt: z.string().min(1).max(5000),
  model: z.string().optional(),
});
