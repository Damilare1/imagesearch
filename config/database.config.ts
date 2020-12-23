import dotenv from "dotenv";

dotenv.config();

export const DBConfig = {
  database: {
    connectionString: "postgres://localhost:5432",
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_NAME,
    password: process.env.POSTGRES_PASSWORD,
    port: Number(process.env.POSTGRES_PORT),
    dialect: "postgres",
  },
  elasticSearch: {
    address: "localhost:9200",
    log: "info",
  },
};
