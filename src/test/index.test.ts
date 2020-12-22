import request, { Response } from "supertest";
import fs from "mz/fs";
import server from "../index";
require('dotenv').config()


const filePath1: string = `${__dirname}/TestImage/earth.jpg`;
const filePath2: string = `${__dirname}/TestImage/earth-large.png`;
const filePath3: string = `${__dirname}/TestImage/earth.ico`;

describe("Upload Endpoint", () => {
  it("Post", async (done) => {
    fs.exists(filePath1).then(async (exists) => {
      if (!exists) throw new Error("file does not exist");
      const res:Response = await request(server).post("/images/upload")
      .field('description', 'earth')
      .attach('image', filePath1);
      expect(res.status).toEqual(201);
      const { text } = res;
      expect(text).toBe(`Successfully uploaded. Image URL: ${process.env.AWS_S3_SERVER}/${process.env.AWS_S3_BUCKET}/earth.jpg`);
      done();
    });
  });
  it("Fails due to size above 500kb", async (done) => {
    fs.exists(filePath2).then(async (exists) => {
      if (!exists) throw new Error("file does not exist");
      const res:Response = await request(server).post("/images/upload")
      .field('description', 'earth')
      .attach('image', filePath2);
      expect(res.status).toEqual(400);
      const { text } = res;
      expect(text).toBe(`Error, please select an image of the appropriate size to upload`);
      done();
    });
  });
  it("Fails due to unsupported type", async (done) => {
    fs.exists(filePath3).then(async (exists) => {
      if (!exists) throw new Error("file does not exist");
      const res:Response = await request(server).post("/images/upload")
      .field('description', 'earth')
      .attach('image', filePath3);
      expect(res.status).toEqual(400);
      const { text } = res;
      expect(text).toBe(`Only JPEG/PNG Files are allowed!`);
      done();
    });
  });
  it("Fails due to no description", async (done) => {
    fs.exists(filePath1).then(async (exists) => {
      if (!exists) throw new Error("file does not exist");
      const res:Response = await request(server).post("/images/upload")
      .attach('image', filePath1);
      expect(res.status).toEqual(400);
      const { text } = res;
      expect(text).toBe(`Please enter image description`);
      done();
    });
  });
  it("Fails due to no image", async (done) => {
    fs.exists(filePath1).then(async (exists) => {
      if (!exists) throw new Error("file does not exist");
      const res:Response = await request(server).post("/images/upload")
      .field('description', 'earth')
      expect(res.status).toEqual(400);
      const { text } = res;
      expect(text).toBe(`Error, please select an image of the appropriate size to upload`);
      done();
    });
  });
});
afterAll(async (done) => {
  // close server conection
  server.close();
  done();
});
