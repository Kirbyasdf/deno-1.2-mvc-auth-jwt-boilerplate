import { Router } from "../deps.ts";

import {
  getUser,
  getUsers,
} from "../controllers/user.controller.ts";

export const userRouter = new Router({ prefix: "/users" });

userRouter.get("/", getUsers);

userRouter.get("/:id", getUser);
