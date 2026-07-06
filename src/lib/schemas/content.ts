import { z } from "zod";

export const moduleMetadataSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  language: z.enum(["de", "es"]),
  estimatedMinutes: z.number().int().positive(),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
  learningObjectives: z.array(z.string()).min(1),
  tags: z.array(z.string()).optional(),
  version: z.string().min(1),
  status: z.enum(["draft", "review", "published"]),
  reviewedBy: z.string().nullable().optional(),
  reviewedAt: z.string().nullable().optional(),
});

export type ModuleMetadata = z.infer<typeof moduleMetadataSchema>;

export const quizOptionSchema = z.object({
  id: z.string().min(1),
  text: z.string().min(1),
  correct: z.boolean(),
});

export const quizFeedbackSchema = z.object({
  correct: z.string().min(1),
  incorrect: z.string().min(1),
});

export const multipleChoiceQuestionSchema = z.object({
  id: z.string().min(1),
  type: z.literal("multiple_choice"),
  question: z.string().min(1),
  pictogram: z.string().optional(),
  options: z.array(quizOptionSchema).min(2),
  feedback: quizFeedbackSchema,
});

export const trueFalseQuestionSchema = z.object({
  id: z.string().min(1),
  type: z.literal("true_false"),
  question: z.string().min(1),
  correct: z.boolean(),
  feedback: quizFeedbackSchema,
});

export const quizQuestionSchema = z.discriminatedUnion("type", [
  multipleChoiceQuestionSchema,
  trueFalseQuestionSchema,
]);

export const quizSchema = z
  .object({
    $schema: z.literal("demenz-schulungen/quiz/v1"),
    moduleSlug: z.string().min(1),
    language: z.enum(["de", "es"]),
    passingScore: z.number().min(0).max(100),
    maxAttempts: z.number().int().positive().optional(),
    questions: z.array(quizQuestionSchema).min(1),
  })
  .superRefine((data, ctx) => {
    for (const question of data.questions) {
      if (question.type === "multiple_choice") {
        const correctCount = question.options.filter((o) => o.correct).length;
        if (correctCount !== 1) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Frage ${question.id}: genau eine richtige Antwort erforderlich`,
          });
        }
      }
    }
  });

export type Quiz = z.infer<typeof quizSchema>;
export type QuizQuestion = z.infer<typeof quizQuestionSchema>;
