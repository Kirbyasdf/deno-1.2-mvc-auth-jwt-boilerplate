import { Router } from "../deps.ts";
import { getTest, dbResTest } from "../controllers/demo.controller.ts";

export const demoRouter = new Router({ prefix: "/demo" });

demoRouter.get("/", getTest);

demoRouter.get("/db-test", dbResTest);
