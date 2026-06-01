import type { Hono } from "hono";
import type { HttpBindings } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

type App = Hono<{ Bindings: HttpBindings }>;

export function serveStaticFiles(app: App) {
  // Try multiple paths for Railway compatibility
  const possiblePaths = [
    path.resolve(import.meta.dirname, "../dist/public"),
    path.resolve(import.meta.dirname, "../../dist/public"),
    path.resolve(process.cwd(), "dist/public"),
    path.resolve("./dist/public"),
  ];

  let distPath = possiblePaths.find((p) => fs.existsSync(p));

  if (!distPath) {
    console.warn("[Static Files] dist/public not found, trying fallback paths...");
    distPath = path.resolve(process.cwd(), "dist/public");
  }

  console.log(`[Static Files] Serving from: ${distPath}`);

  app.use("*", serveStatic({ root: distPath }));

  app.notFound((c) => {
    const accept = c.req.header("accept") ?? "";
    if (!accept.includes("text/html")) {
      return c.json({ error: "Not Found" }, 404);
    }
    const indexPath = path.resolve(distPath, "index.html");
    if (fs.existsSync(indexPath)) {
      const content = fs.readFileSync(indexPath, "utf-8");
      return c.html(content);
    }
    return c.json({ error: "index.html not found" }, 404);
  });
}
