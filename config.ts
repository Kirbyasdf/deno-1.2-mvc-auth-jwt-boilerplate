import { config } from "./deps.ts";
const env = config({ safe: true });

console.log(Deno.env.get("EXAMPLE_ENV"));
console.log(env.DOTENV_EXAMPLE);

export const APP_HOST = env.APP_HOST || "127.0.0.1";
export const APP_PORT = env.APP_PORT || 4000;
export const JWT_SECERT = env.JWT_SECERT || "xoxo gossip girl";
