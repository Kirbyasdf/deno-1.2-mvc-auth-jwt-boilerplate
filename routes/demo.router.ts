import { Router } from "../deps.ts";
import { getTest, dbResTest } from "../controllers/demo.controller.ts";

const BASE_URL = "/demo";

export const demoRouter = new Router();

demoRouter.get(BASE_URL, getTest);

demoRouter.get(BASE_URL + "/db-test", dbResTest);
