import { APP_HOST, APP_PORT } from "./config.ts";
import { Application, Router } from "./deps.ts";
import { demoRouter } from "./routes/demo.router.ts";
import { authRouter } from "./routes/auth.router.ts";
import { userRouter } from "./routes/user.router.ts";

const app = new Application();

app.use(demoRouter.routes());
app.use(authRouter.routes());
app.use(userRouter.routes());

console.log("Server is good 2 @ " + APP_HOST + ":" + APP_PORT);

await app.listen({ port: +APP_PORT });
