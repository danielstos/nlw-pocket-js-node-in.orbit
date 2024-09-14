import dayjs from "dayjs";
import { db } from "../db";
import { goalCompletions, goals } from "../db/schema";
import { and, count, gte, lte, eq, sql } from "drizzle-orm";
import { sqliteTable } from "drizzle-orm/sqlite-core";
import { number } from "zod";

export async function getWeekSummary() {
  const firstDayOfWeek = dayjs().startOf("week").toDate();
  const lastDayOfWeek = dayjs().endOf("week").toDate();
  //aqui eu pego todos as metas que foram criados na semana
  const goalsCreatedUpToWeek = db.$with("goals_created_up_to_week").as(
    db
      .select({
        id: goals.id,
        title: goals.title,
        desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
        createdAt: goals.createdAt,
      })
      .from(goals)
      .where(lte(goals.createdAt, lastDayOfWeek))
  );
  //aqui eu pego todos as metas que foram completados na semana
  const goalsCompletionInWeek = db.$with("goals_completion_in_week").as(
    db
      .select({
        id: goals.id,
        title: goals.title,
        completedAt: goalCompletions.createdAt,
        completedAtDate: sql/*sql*/ `
         DATE(${goalCompletions.createdAt})
        `.as("completedAtDate"),
      })
      .from(goalCompletions)
      .innerJoin(goals, eq(goals.id, goalCompletions.goalId))
      .where(
        and(
          gte(goalCompletions.createdAt, firstDayOfWeek),
          lte(goalCompletions.createdAt, lastDayOfWeek)
        )
      )
  );
  const goalsCompletedByWeekDay = db.$with("goals_completed_by_week_day").as(
    db
      .select({
        completedAtDate: goalsCompletionInWeek.completedAtDate,
        completions: sql/*sql*/ `
      JSON_AGG(
        JSON_BUILD_OBJECT(
          'id', ${goalsCompletionInWeek.id},
          'title', ${goalsCompletionInWeek.title},
          'completedAt', ${goalsCompletionInWeek.completedAt}
        )
      )
        `.as("completions"),
      })
      .from(goalsCompletionInWeek)
      .groupBy(goalsCompletionInWeek.completedAtDate)
  );

  const result = await db
    .with(goalsCreatedUpToWeek, goalsCompletionInWeek, goalsCompletedByWeekDay)
    .select({
      completed:
        sql/*sql*/ `(SELECT COUNT(*) FROM ${goalsCompletionInWeek})`.mapWith(
          Number
        ),
      total:
        sql/*sql*/ `(SELECT SUM(${goalsCreatedUpToWeek.desiredWeeklyFrequency}) FROM ${goalsCreatedUpToWeek})`.mapWith(
          Number
        ),
      goalsPerDay: sql/*sql*/ ` 
         JSON_OBJECT_AGG(
          ${goalsCompletedByWeekDay.completedAtDate},
          ${goalsCompletedByWeekDay.completions}
        ) 
     `,
    })
    .from(goalsCompletedByWeekDay);

  return {
    summary: result,
  };
}
