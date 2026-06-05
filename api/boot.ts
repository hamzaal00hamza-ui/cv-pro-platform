import { Hono } from "hono";
import { bodyLimit } from "hono/body-limit";
import type { HttpBindings } from "@hono/node-server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "./router";
import { createContext } from "./context";
import { env } from "./lib/env";

const app = new Hono<{ Bindings: HttpBindings }>();

app.use(bodyLimit({ maxSize: 50 * 1024 * 1024 }));
app.use("/api/trpc/*", async (c) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: c.req.raw,
    router: appRouter,
    createContext,
  });
});
// Syriatel Cash verification proxy (avoids CORS in browser)
app.post("/api/verify-payment", async (c) => {
  try {
    const body = await c.req.json();
    const { transaction_id, sender_phone, amount } = body;

    const STORE_GSM = "0982493924";
    const API_KEY = "a84b025e4b7e09ad38450aaa555ee83b0ae6ff8b17ec0d92e5a41e0f3ce39913";

    // البحث عن العملية برقمها في حساب المتجر
    const url = `https://apisyria.com/api/v1?resource=syriatel&action=find_tx&tx=${encodeURIComponent(transaction_id)}&gsm=${STORE_GSM}&period=7`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-Api-Key": API_KEY,
        "Accept": "application/json",
      },
    });

    const data: any = await response.json();

    if (!response.ok || !data.success) {
      return c.json({ success: false, message: data.error || "فشل الاتصال بالخدمة" }, 400);
    }

    // التحقق من وجود العملية
    if (!data.data?.found) {
      return c.json({ success: false, message: "رقم العملية غير موجود، تأكد من الرقم وحاول مجدداً" }, 400);
    }

    const tx = data.data.transaction;
    const txAmount = parseInt(tx.amount);
    const expectedAmount = parseInt(amount) || 5000;

    // التحقق من المبلغ
    if (txAmount < expectedAmount) {
      return c.json({ success: false, message: `المبلغ غير كافٍ، تم استلام ${txAmount} ل.س بدلاً من ${expectedAmount} ل.س` }, 400);
    }

    // التحقق من رقم المرسل (اختياري — يتحقق إن أُرسل)
    if (sender_phone && tx.from && !tx.from.includes(sender_phone.slice(-6))) {
      return c.json({ success: false, message: "رقم الهاتف المُرسل لا يطابق العملية" }, 400);
    }

    return c.json({
      success: true,
      message: "تم التحقق من الدفع بنجاح",
      transaction: {
        no: tx.transaction_no,
        amount: tx.amount,
        date: tx.date,
        from: tx.from,
      }
    });

  } catch (err: any) {
    return c.json({ success: false, message: "تعذر الاتصال بخدمة التحقق" }, 500);
  }
});

app.all("/api/*", (c) => c.json({ error: "Not Found" }, 404));

export default app;

if (env.isProduction) {
  const { serve } = await import("@hono/node-server");
  const { serveStaticFiles } = await import("./lib/vite");
  serveStaticFiles(app);

  const port = parseInt(process.env.PORT || "3000");
  serve({ fetch: app.fetch, port }, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}
