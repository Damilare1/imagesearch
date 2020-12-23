import { Client } from "@elastic/elasticsearch";
import Mock from "@elastic/elasticsearch-mock";
import { ESConfig } from "../image.elasticsearch";

const mock = new Mock();

const client = new Client({
  node: "http://localhost:9200",
  Connection: mock.getConnection(),
});

mock.add(
  {
    method: "GET",
    path: "/",
  },
  () => {
    return { status: "ok" };
  }
);

mock.add(
  {
    method: "POST",
    path: "/randomindex",
  },
  () => {
    return {
      hits: {
        total: { value: 1, relation: "eq" },
        hits: [{ _source: { baz: "faz" } }],
      },
    };
  }
);

const document = {
  description: "sth",
  url: "sth",
  name: "sth",
  type: "sth",
  size: "sth",
};
describe("ESSearch", () => {
  it("it returns elasticsearch cluster is down! on connection error", async (done) => {
    const Dependencies = {
      ESClient: client,
    };

    const MockImageController = ESConfig(Dependencies);

    const result = await MockImageController.createDocument(document);
    console.log(result);
    done();
  });
});

afterAll(async (done) => {
  done();
});
