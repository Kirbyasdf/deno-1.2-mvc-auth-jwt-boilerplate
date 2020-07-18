import client from "../db/dbClient.ts";
import { bcrypt } from "../deps.ts";
import { User } from "../types.ts";
import { validateJwt } from "https://deno.land/x/djwt/validate.ts";
import {
  makeJwt,
  setExpiration,
  Jose,
  Payload,
} from "../deps.ts";
import { JWT_SECERT } from "../config.ts";

export class UserRepo {
  static async test() {
    return await client.query("SELECT CURRENT_TIMESTAMP");
  }

  static async hashPass(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  static async checkPass(user: User, incommingPass: string): Promise<Boolean> {
    return await bcrypt.compare(incommingPass, user.pw_hash);
  }

  static async generateToken(user: User): Promise<any> {
    const payload: Payload = {
      id: user.id,
      exp: setExpiration(new Date().getTime() + (3600 * 1000)),
    };
    const header: Jose = {
      alg: "HS256",
      typ: "JWT",
    };
    return makeJwt({ header, payload, key: JWT_SECERT });
  }

  static async create(user: Omit<User, "id" | "pw_hash">): Promise<any> {
    const { username, password } = user;
    const pwHash: string = await this.hashPass(password);
    try {
      const text =
        "INSERT INTO users (username, pw_hash) VALUES ($1, $2) RETURNING id, username";
      const values = [
        username,
        pwHash,
      ];
      const result = await client.query({
        text,
        args: values,
      });
      return result.rowsOfObjects()[0];
    } catch (err) {
      console.warn(err);
    }
  }

  static async find(column: string, value: string | number): Promise<any> {
    try {
      const text = `select * from users where ${column} = $1`;
      const result = await client.query({
        text,
        args: [value],
      });
      return result.rowsOfObjects()[0];
    } catch (error) {
      console.warn(error);
    }
  }

  static async selectAll() {
    const text = "SELECT * FROM users ORDER BY id";
    const result = await client.query(text);
    return result.rowsOfObjects();
  }

  static async selectById(id: string) {
    const text =
      "SELECT id, is_admin, username, created_at, updated_at FROM users WHERE id = $1";
    const values = [id];
    const result = await client.query({ text, args: values });
    return result.rowsOfObjects()[0];
  }

  async delete(id: number) {
    return client.query(`DELETE FROM reviews_table WHERE id = $1`, id);
  }
}
