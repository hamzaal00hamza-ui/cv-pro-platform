import { z } from "zod";
import { createRouter, publicQuery } from "../middleware";
import { getDb } from "../queries/connection";
import { cvSubmissions } from "@db/schema";
import { eq } from "drizzle-orm";

const EducationSchema = z.object({
  institution: z.string(),
  degree: z.string(),
  fieldOfStudy: z.string(),
  startDate: z.string(),
  endDate: z.string(),
});

const ExperienceSchema = z.object({
  company: z.string(),
  position: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  description: z.string(),
});

export const cvRouter = createRouter({
  create: publicQuery
    .input(
      z.object({
        userId: z.number(),
        template: z.string().default("modern"),
        personalInfo: z.object({
          fullName: z.string(),
          email: z.string(),
          phone: z.string(),
          address: z.string(),
          summary: z.string(),
        }),
        education: z.array(EducationSchema),
        experience: z.array(ExperienceSchema),
        skills: z.array(z.string()),
        languages: z.array(z.object({ language: z.string(), level: z.string() })),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(cvSubmissions).values({
        userId: input.userId,
        template: input.template,
        personalInfo: input.personalInfo,
        education: input.education,
        experience: input.experience,
        skills: input.skills,
        languages: input.languages,
        status: "completed",
      });
      return { id: Number(result[0].insertId) };
    }),

  getById: publicQuery
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();
      const cv = await db.select().from(cvSubmissions).where(eq(cvSubmissions.id, input.id));
      return cv[0] || null;
    }),
});
