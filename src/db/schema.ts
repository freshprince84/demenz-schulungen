import {
  pgTable,
  uuid,
  text,
  timestamp,
  boolean,
  integer,
  pgEnum,
  unique,
} from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["LEARNER", "INSTRUCTOR", "ADMIN"]);
export const languageEnum = pgEnum("language", ["DE", "ES"]);
export const difficultyLevelEnum = pgEnum("difficulty_level", [
  "BEGINNER",
  "INTERMEDIATE",
  "ADVANCED",
]);
export const contentTypeEnum = pgEnum("content_type", [
  "STORYBOARD",
  "VIDEO",
  "QUIZ",
]);
export const pictogramSourceEnum = pgEnum("pictogram_source", [
  "MINIMAX",
  "MANUAL",
]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  role: roleEnum("role").default("LEARNER").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const learnerSessions = pgTable("learner_sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const courses = pgTable("courses", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  language: languageEnum("language").default("DE").notNull(),
  difficultyLevel: difficultyLevelEnum("difficulty_level")
    .default("BEGINNER")
    .notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const modules = pgTable(
  "modules",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    courseId: uuid("course_id")
      .references(() => courses.id, { onDelete: "cascade" })
      .notNull(),
    slug: text("slug").notNull().unique(),
    title: text("title").notNull(),
    description: text("description"),
    order: integer("order").notNull(),
    contentType: contentTypeEnum("content_type")
      .default("STORYBOARD")
      .notNull(),
    estimatedMinutes: integer("estimated_minutes"),
    version: text("version").default("1.0.0").notNull(),
    status: text("status").default("draft").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => [unique().on(t.courseId, t.order)],
);

export const progress = pgTable(
  "progress",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    sessionId: uuid("session_id")
      .references(() => learnerSessions.id, { onDelete: "cascade" })
      .notNull(),
    userId: uuid("user_id").references(() => users.id, { onDelete: "set null" }),
    moduleId: uuid("module_id")
      .references(() => modules.id, { onDelete: "cascade" })
      .notNull(),
    completed: boolean("completed").default(false).notNull(),
    score: integer("score"),
    completedAt: timestamp("completed_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => [unique().on(t.sessionId, t.moduleId)],
);

export const pictograms = pgTable("pictograms", {
  id: uuid("id").primaryKey().defaultRandom(),
  moduleId: uuid("module_id").references(() => modules.id, {
    onDelete: "cascade",
  }),
  keywordDe: text("keyword_de").notNull(),
  imagePath: text("image_path").notNull(),
  source: pictogramSourceEnum("source").notNull(),
  category: text("category"),
  altText: text("alt_text"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type User = typeof users.$inferSelect;
export type Course = typeof courses.$inferSelect;
export type Module = typeof modules.$inferSelect;
export type Progress = typeof progress.$inferSelect;
export type LearnerSession = typeof learnerSessions.$inferSelect;
