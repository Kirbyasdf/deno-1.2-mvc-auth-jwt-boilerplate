import { RouterContext } from "../deps.ts";
import { UserRepo } from "../models/User.ts";

export const register = async (
  { request, response, ...ctx }: RouterContext,
) => {
  try {
    if (!request.hasBody) {
      response.status = 400;
      response.body = { success: false, msg: "Invalid request : no body " };
      return;
    }
    const body = await request.body();
    const data: any = await body.value;
    console.log(data);

    if (!data.username || !data.password) {
      response.status = 400;
      response.body = {
        success: false,
        msg: "Please provide an email and password",
      };
      return;
    }
    const user = await UserRepo.create(data);

    if (!user) {
      response.status = 500;
      response.body = {
        success: false,
        msg: "User Create Failed",
      };
      return;
    }
    const token = await UserRepo.generateToken(user);
    response.status = 200;
    response.body = ({ success: true, token });
  } catch (err) {
    console.warn(err);
  }
};

export const login = async (
  { request, response, ...ctx }: RouterContext,
) => {
  try {
    if (!request.hasBody) {
      response.status = 400;
      response.body = { success: false, msg: "Invalid request : no body " };
      return;
    }

    const body = await request.body();
    const { username, password: incomingPass } = await body.value;

    if (!username || !incomingPass) {
      response.status = 400;
      response.body = {
        success: false,
        msg: "Please provide an email and password",
      };
      return;
    }

    const user = await UserRepo.find("username", username);

    // not sure how I want to handle this.. if I give back a 404 error with a username not found ...then we've exposed our users privacy, that infact a user with that username/email etc is registered on the site....hmmmm
    if (!user) {
      response.status = 400;
      response.body = {
        success: false,
        msg: "Invalid Credentials",
      };
      return;
    }

    if (user && (await UserRepo.checkPass(user, incomingPass))) {
      const token = await UserRepo.generateToken(user);
      response.status = 200;
      response.body = ({ success: true, token });
      return;
    }

    response.status = 400;
    response.body = {
      success: false,
      msg: "Invalid Credentials",
    };
  } catch (err) {
    console.warn(err);
  }
};

export const privateAction = async (
  { request, response, state, ...ctx }: RouterContext,
) => {
  try {
    if (!state.user) {
      response.status = 401;
      response.body = {
        success: false,
        msg: "You are not Authorized",
      };
      return;
    }
    response.status = 200;
    response.body = {
      success: true,
      data: state.user,
    };
  } catch (err) {
    console.warn(err);
  }
};
