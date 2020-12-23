import { Client } from "elasticsearch";

export const elasticClient = new Client({
  host: "localhost:9200",
  log: "info",
  apiVersion: "6.8",
});

