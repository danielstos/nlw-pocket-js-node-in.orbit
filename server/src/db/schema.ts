import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core";

export const goals = pgTable("goals", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  desiredWeeklyFrequency: integer("desired_weekly_frequency").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
