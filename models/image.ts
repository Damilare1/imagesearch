"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  image.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      url: DataTypes.STRING,
      size: DataTypes.INTEGER,
      type: DataTypes.STRING,
      id: {
        type: DataTypes.INTEGER, 
        defaultValue: 0,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    {
      sequelize,
      modelName: "image",
    }
  );
  return image;
};
