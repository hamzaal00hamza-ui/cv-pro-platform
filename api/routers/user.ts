import { z } from "zod";
import { createRouter, publicQuery } from "../middleware";
import { getDb } from "../queries/connection";
import { users } from "@db/schema";
import { eq } from "drizzle-orm";

export const userRouter = createRouter({
  create: publicQuery
    .input(
      z.object({
        fullName: z.string().min(2, "الاسم مطلوب"),
        email: z.string().email("بريد إلكتروني غير صالح"),
        phone: z.string().min(8, "رقم هاتف غير صالح"),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(users).values({
        fullName: input.fullName,
        email: input.email,
        phone: input.phone,
      });
      return { id: Number(result[0].insertId) };
    }),

  getById: publicQuery
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();
      const user = await db.select().from(users).where(eq(users.id, input.id));
      return user[0] || null;
    }),
});
