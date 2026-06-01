import {
  mysqlTable,
  serial,
  varchar,
  text,
  timestamp,
  json,
  int,
  mysqlEnum,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const cvSubmissions = mysqlTable("cv_submissions", {
  id: serial("id").primaryKey(),
  userId: int("user_id").notNull(),
  template: varchar("template", { length: 50 }).notNull().default("modern"),
  personalInfo: json("personal_info").notNull(),
  education: json("education").notNull(),
  experience: json("experience").notNull(),
  skills: json("skills").notNull(),
  languages: json("languages").notNull(),
  status: mysqlEnum("status", ["draft", "completed"]).notNull().default("draft"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const payments = mysqlTable("payments", {
  id: serial("id").primaryKey(),
  cvId: int("cv_id").notNull(),
  userName: varchar("user_name", { length: 255 }).notNull(),
  userPhone: varchar("user_phone", { length: 50 }).notNull(),
  amount: int("amount").notNull().default(5000),
  paymentMethod: mysqlEnum("payment_method", ["syriatel_cash"]).notNull().default("syriatel_cash"),
  status: mysqlEnum("status", ["pending", "completed", "failed"]).notNull().default("pending"),
  transactionRef: varchar("transaction_ref", { length: 100 }),
  paidAt: timestamp("paid_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
