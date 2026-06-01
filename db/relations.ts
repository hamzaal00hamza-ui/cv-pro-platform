import { relations } from "drizzle-orm";
import { users, cvSubmissions, payments } from "./schema";

export const usersRelations = relations(users, ({ many }) => ({
  cvSubmissions: many(cvSubmissions),
}));

export const cvSubmissionsRelations = relations(cvSubmissions, ({ one }) => ({
  user: one(users, {
    fields: [cvSubmissions.userId],
    references: [users.id],
  }),
}));

export const paymentsRelations = relations(payments, ({ one }) => ({
  cv: one(cvSubmissions, {
    fields: [payments.cvId],
    references: [cvSubmissions.id],
  }),
}));
