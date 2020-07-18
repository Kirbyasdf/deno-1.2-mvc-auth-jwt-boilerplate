import { Router } from "../deps.ts";
import { authHandler } from "../middleware/auth.ts";

import {
  login,
  register,
  privateAction,
} from "../controllers/auth.controller.ts";

const BASE_URL = "/auth";

export const authRouter = new Router();

authRouter.post(BASE_URL + "/login", login);
authRouter.post(BASE_URL + "/register", register);

authRouter.get(BASE_URL + "/privateRoute", authHandler, privateAction);
