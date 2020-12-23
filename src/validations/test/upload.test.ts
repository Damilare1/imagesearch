import { ImageValidation } from "../upload.validation";

describe("validation", () => {
  it("It throws file validation error", async (done) => {
    let req, res;
    req = {
      fileValidationError: "File error",
    };
    res = {};

    const imageValidation = new ImageValidation();

    expect(() => imageValidation.validateImage(req, res, {})).toThrowError(
      "File error"
    );
    done();
  });

  it("It throws error on err object", async (done) => {
    let req, res;
    req = {
      fileValidationError: "",
    };
    res = {};

    const imageValidation = new ImageValidation();

    expect(() => imageValidation.validateImage(req, res, {message: "File error"})).toThrowError(
        "File error"
      );;
    done();
  });
});

afterAll(async (done) => {
  done();
});
