import { z } from "zod";
import { createRouter, publicQuery } from "../middleware";
import { getDb } from "../queries/connection";
import { payments } from "@db/schema";
import { eq } from "drizzle-orm";

export const paymentRouter = createRouter({
  create: publicQuery
    .input(
      z.object({
        cvId: z.number(),
        userName: z.string().min(2, "الاسم مطلوب"),
        userPhone: z.string().min(8, "رقم هاتف غير صالح"),
        amount: z.number().default(5000),
        paymentMethod: z.enum(["syriatel_cash"]).default("syriatel_cash"),
        transactionRef: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(payments).values({
        cvId: input.cvId,
        userName: input.userName,
        userPhone: input.userPhone,
        amount: input.amount,
        paymentMethod: input.paymentMethod,
        status: "pending",
        transactionRef: input.transactionRef || `SYR-${Date.now()}`,
      });
      return { 
        id: Number(result[0].insertId),
        transactionRef: input.transactionRef || `SYR-${Date.now()}`,
        status: "pending",
        amount: input.amount,
      };
    }),

  confirm: publicQuery
    .input(
      z.object({
        id: z.number(),
        transactionRef: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      await db
        .update(payments)
        .set({ 
          status: "completed",
          paidAt: new Date(),
          transactionRef: input.transactionRef,
        })
        .where(eq(payments.id, input.id));
      return { success: true };
    }),

  getById: publicQuery
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();
      const payment = await db.select().from(payments).where(eq(payments.id, input.id));
      return payment[0] || null;
    }),
});
