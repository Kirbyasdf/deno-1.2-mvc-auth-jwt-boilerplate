import { RouterContext, validateJwt } from "../deps.ts";
import { User } from "../types.ts";
import { JWT_SECERT } from "../config.ts";
import { UserRepo } from "../models/User.ts";

export async function authHandler(
  { request, response, state, ...ctx }: RouterContext,
  next: () => Promise<void>,
) {
  //   try {
  //     const jwt = request.headers.get("authorization")?.split("bearer ")?.[1] ||
  //       "";

  //     const decoded = await validateJwt(jwt, JWT_SECERT, {
  //       isThrowing: false,
  //     });

  //     if (!decoded) {
  //       state.user = null;
  //     }
  //     const user = await UserRepo.selectById(decoded?.payload?.id! as string);

  //     if (!user) {
  //       state.user = null;
  //     }

  //     state.user = user;
  //     await next();
  //   } catch (err) {
  //     console.warn(err);
  //   }
}
