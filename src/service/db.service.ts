import { DataTypes } from "sequelize";
import Image from "../../models/image";
import ImageModel from "../../models";

const sequelize = ImageModel.sequelize;

require("dotenv").config();

export const createInstance = async ({name, type, size, url, description}) =>
  Image(sequelize, DataTypes).create({
    name,
    type,
    size,
    url,
    description,
  });
