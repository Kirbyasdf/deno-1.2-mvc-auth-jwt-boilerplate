# deno-1.2-boilerplate
example of MVC with env + auth + DB for DENO 


if you are getting errors try "deno --reload" as updating deno and other deps can lead to issues with ones cache


current issues.......
my knowledge of typescript... I have alot of returns for ":Promise any" ...

Trying to determine best practice for deno w/ File organization

-handle user interface better...I have password and pw_hash...

-handle state of ctx better... I feel there is vulenabilities I didnt consider and edge cases where state.user would not be null by accident and grant auth to bad reqs.

** this repo assumed you know how to set up a database  with postgres containing the following schema.... 

```
CREATE TABLE user_table(
  id    SERIAL PRIMARY KEY,
  username  TEXT UNIQUE NOT NULL ,
  pw_hash TEXT,
);
```


## TO START

-> deno run --allow-net --allow-env --unstable server.ts

## OR (if you have denon installed)

-> denon start server.ts

-----------------
-Post paths

http://localhost:4000/auth/register

http://localhost:4000/auth/login

-auth test path ( auth header with prefix: Bearer)

http://localhost:4000/auth/privateRoute

-Get Paths for testing

http://localhost:4000/demo/

(db connect test) http://localhost:4000/demo/db-test

http://localhost:4000/users/

http://localhost:4000/users/:id

deps
oak (framework)

https://github.com/oakserver/oak

djwt (json webtoken)

https://github.com/timonson/djwt

postgres client (db client)

https://github.com/buildondata/deno-postgres
