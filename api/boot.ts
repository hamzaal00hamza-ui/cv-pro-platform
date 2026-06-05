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
    const { transaction_id, sender_phone, receiver_phone, amount } = body;

    const response = await fetch("https://apisyria.com/api/v1/syriatel-cash/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": "a84b025e4b7e09ad38450aaa555ee83b0ae6ff8b17ec0d92e5a41e0f3ce39913",
      },
      body: JSON.stringify({ transaction_id, sender_phone, receiver_phone, amount }),
    });

    const data = await response.json();
    return c.json(data, response.ok ? 200 : 400);
  } catch (err: any) {
    return c.json({ success: false, message: "فشل الاتصال بخدمة التحقق" }, 500);
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
