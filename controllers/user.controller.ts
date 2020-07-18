import { RouterContext } from "../deps.ts";
import { UserRepo } from "../models/User.ts";

export const getUsers = async (
  { response, request, ...ctx }: RouterContext,
) => {
  const users = await UserRepo.selectAll();
  response.status = 200;
  response.body = {
    success: true,
    count: users.length,
    data: users,
  };
};

export const getUser = async (
  { response, params, ...ctx }: RouterContext,
) => {
  const { id } = params;

  if (!id) {
    response.status = 400;
    response.body = { success: false, msg: "Invalid User ID" };
    return;
  }

  const user = await UserRepo.selectById(id);
  if (!user) {
    response.status = 404;
    response.body = { success: false, msg: `User with ID ${id} not found` };
    return;
  }

  response.status = 200;
  response.body = {
    success: true,
    data: user,
  };
};
