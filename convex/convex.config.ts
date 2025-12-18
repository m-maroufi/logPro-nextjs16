import betterAuth from "@convex-dev/better-auth/convex.config";
import { defineApp } from "convex/server";
import presence from "@convex-dev/presence/convex.config.js";

const app = defineApp();
app.use(betterAuth);
app.use(presence);

export default app;
