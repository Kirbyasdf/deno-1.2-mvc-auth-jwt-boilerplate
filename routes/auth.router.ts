import { Router } from "../deps.ts";
import { authHandler } from "../middleware/auth.ts";

import {
  login,
  register,
  privateAction,
} from "../controllers/auth.controller.ts";

export const authRouter = new Router({ prefix: "/auth" });

authRouter.post("/login", login);
authRouter.post("/register", register);

authRouter.get("/privateroute", authHandler, privateAction);
