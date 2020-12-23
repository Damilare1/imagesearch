import { Sequelize, DataTypes } from "sequelize";
import { mocked } from "ts-jest/utils";
import ImageModel from "../image"

jest.mock("sequelize", () => {
  const mSequelize = {
    authenticate: jest.fn(),
    define: jest.fn(),
  };
  const actualSequelize = jest.requireActual("sequelize");
  return {
    Sequelize: jest.fn(() => mSequelize),
    DataTypes: actualSequelize.DataTypes,
  };
});

const mSequelizeContext = new Sequelize();

require("dotenv").config();


describe("Upload Endpoint", () => {
  const Image = ImageModel(mSequelizeContext, DataTypes);
  

  console.log(Image)
});
