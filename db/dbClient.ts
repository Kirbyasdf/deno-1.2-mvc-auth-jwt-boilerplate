import { Client } from "../deps.ts";
import { DB, DB_USER, DB_PORT, DB_HOST } from "../config.ts";

class Database {
  client: Client = new Client({
    database: DB,
    user: DB_USER,
    hostname: DB_HOST,
    port: +DB_PORT,
  });
  constructor() {
    this.connect();
  }

  async connect() {
    await this.client.connect();
  }
}

export default new Database().client;
