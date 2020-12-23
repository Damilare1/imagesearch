import { UploadController } from "../upload.controller";
import upload from "../../service/s3.service";

describe("Upload", () => {
  it("It returns custom error when validation throws error", async (done) => {
    let req, res;
    req = {
      file: {
        location: "string",
        size: 10000,
        mimeType: "png",
        originalname: "test.png",
      },
      body: {
        description: "test",
      },
    };
    res = {
      status: (code) => {
        return { send: (message) => message };
      },
    };

    const UploadDependencies = {
      imageValidation: {
        validateImage: (req, res, err) => {
          throw new Error("Invalid");
        },
      },
      createInstance: (data: any) => {
        throw new Error();
      },
      ESService: {
        addDocument: (data: any) => {
          throw new Error();
        },
      },
      deleteImage: (key: string) => {
        throw new Error();
      },
      upload
    };

    const MockUploadController = UploadController(UploadDependencies);

    const result = await MockUploadController.UploadFunc(req, res, {});
    expect(result).toBe("Invalid")
    done();
  });
  it("It returns custom error and attempts to delete image when DB create instance throws error", async (done) => {
    let req, res;
    req = {
      file: {
        location: "string",
        size: 10000,
        mimeType: "png",
        originalname: "test.png",
      },
      body: {
        description: "test",
      },
    };
    res = {
      status: (code) => {
        return { send: (message) => message };
      },
    };

    const UploadDependencies = {
      imageValidation: {
        validateImage: (req, res, err) => {
        },
      },
      createInstance: (data: any) => {
        throw new Error("Invalid Instance");
      },
      ESService: {
        addDocument: (data: any) => {
        },
      },
      deleteImage: (key: string) => {
      },
      upload
    };

    UploadDependencies.deleteImage = jest.fn();

    const MockUploadController = UploadController(UploadDependencies);

    const result = await MockUploadController.UploadFunc(req, res, {});
    expect(UploadDependencies.deleteImage).toHaveBeenCalled();
    expect(result).toBe("Invalid Instance")
    done();
  });
  it("It returns custom error and attempts to delete image when ES create instance throws error", async (done) => {
    let req, res;
    req = {
      file: {
        location: "string",
        size: 10000,
        mimeType: "png",
        originalname: "test.png",
      },
      body: {
        description: "test",
      },
    };
    res = {
      status: (code) => {
        return { send: (message) => message };
      },
    };

    const UploadDependencies = {
      imageValidation: {
        validateImage: (req, res, err) => {
        },
      },
      createInstance: (data: any) => {
      },
      ESService: {
        addDocument: (data: any) => {
          throw new Error("Invalid Instance");
        },
      },
      deleteImage: (key: string) => {
      },
      upload
    };

    UploadDependencies.deleteImage = jest.fn();

    const MockUploadController = UploadController(UploadDependencies);

    const result = await MockUploadController.UploadFunc(req, res, {});
    expect(UploadDependencies.deleteImage).toHaveBeenCalled();
    expect(result).toBe("Invalid Instance")
    done();
  });

});

afterAll(async (done) => {
    done();
  });
  
