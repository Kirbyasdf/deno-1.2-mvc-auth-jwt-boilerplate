import { RouterContext, validateJwt, Opts } from "../deps.ts";
import { User } from "../types.ts";
import { JWT_SECERT } from "../config.ts";
import { UserRepo } from "../models/User.ts";

export async function authHandler(
  { request, response, state, ...ctx }: RouterContext,
  next: () => Promise<void>,
) {
  try {
    const jwt = request.headers.get("authorization")?.split("Bearer ")?.[1] ||
      "";
    const decoded: any = await validateJwt(
      jwt,
      JWT_SECERT,
      { algorithm: "HS256" },
    );

    if (!decoded || !decoded.payload.id) {
      state.user = null;
    }

    const user = await UserRepo.selectById(decoded.payload.id);

    if (!user) {
      state.user = null;
    }

    state.user = user;
    await next();
  } catch (err) {
    console.warn(err);
  }
}
