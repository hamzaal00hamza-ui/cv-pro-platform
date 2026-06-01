import { createRouter, publicQuery } from "./middleware";
import { userRouter } from "./routers/user";
import { cvRouter } from "./routers/cv";
import { paymentRouter } from "./routers/payment";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  user: userRouter,
  cv: cvRouter,
  payment: paymentRouter,
});

export type AppRouter = typeof appRouter;
