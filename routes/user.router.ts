import { Router } from "../deps.ts";

import {
  getUser,
  getUsers,
} from "../controllers/user.controller.ts";

const BASE_URL = "/users";

export const userRouter = new Router();

userRouter.get(BASE_URL, getUsers);

userRouter.get(BASE_URL + "/:id", getUser);
