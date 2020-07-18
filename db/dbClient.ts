import { Client } from "../deps.ts";

class Database {
  client: Client = new Client({
    database: "pgadminTest",
    user: "postgres",
    password: "123456",
    hostname: "localhost",
    port: 5432,
  });
  constructor() {
    this.connect();
  }

  async connect() {
    await this.client.connect();
  }
}

export default new Database().client;
