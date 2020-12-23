import { GetImage } from "../image.controller";

describe("Upload", () => {
  it("It returns expected output on success", async (done) => {
    let req, res;
    req = {
      query: {
        search: "",
        page: 0,
        size: 2,
      },
    };
    res = {
      status: (code) => {
        return { json: (message) => message };
      },
    };
    const expectedOutput = { totalCount: 20, results: [] };

    const Dependencies = {
      getSuggestions: async ({ data }) => {
        return expectedOutput;
      },
    };

    const MockImageController = GetImage(Dependencies);

    const result = await MockImageController.handleRequest(req, res);
    expect(result).toBe(expectedOutput);
    done();
  });
  it("It sends 204 when no item is found", async (done) => {
    let req, res;
    req = {
      query: {
        search: "",
        page: 0,
        size: 2,
      },
    };
    res = {
      status: (code) => {
        return { json: (message) => message };
      },
    };

    const Dependencies = {
      getSuggestions: async ({ data }) => {
        return { totalCount: 0, results: [] };
      },
    };

    const MockImageController = GetImage(Dependencies);

    const result = await MockImageController.handleRequest(req, res);
    expect(result).toBe(204);
    done();
  });
  it("It returns server error when error in ES", async (done) => {
    let req, res;
    req = {
      query: {
        search: "",
        page: 0,
        size: 2,
      },
    };
    res = {
      status: (code) => {
        return { send: (message) => message };
      },
    };
    
    const Dependencies = {
      getSuggestions: async ({ data }) => {
        throw new Error("Internal Server Error")
      },
    };

    const MockImageController = GetImage(Dependencies);

    const result = await MockImageController.handleRequest(req, res);
    console.log(result)
    expect(result).toBe("Internal Server Error");
    done();
  });


});

afterAll(async (done) => {
  done();
});
