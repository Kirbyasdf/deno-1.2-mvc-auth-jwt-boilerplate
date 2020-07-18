import { RouterContext } from "../deps.ts";
import client from "../db/dbClient.ts";

export const getTest = async ({ response, request, ...ctx }: RouterContext) => {
  response.status = 200;
  response.body = {
    success: true,
    data: "GET test working",
  };
};

export const dbResTest = async (
  { response }: RouterContext,
) => {
  const test = await client.query("SELECT CURRENT_TIMESTAMP");
  response.status = 200;
  response.body = ({ success: true, data: test.rows });
};
