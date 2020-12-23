import { DataTypes } from 'sequelize'
import { UploadService, deleteImage } from "../service/s3.service";
import { ImageValidation } from "../validations/upload.validation";
import  Image  from "../../models/image";
import ImageModel from "../../models";

const sequelize = ImageModel.sequelize;

require('dotenv').config()

const imageValidation = new ImageValidation();

const upload = UploadService.single("image");

const UploadFunc = async (req: any, res: any, err: any) => {
  try{
    imageValidation.validateImage(req,res, err)
  }catch(err){
    console.log(err.message)
    return res.status(400).send(err.message);
  }
  const { description } = req.body;
  const url = req.file && req.file.location;
  const size = req.file && req.file.size;
  const type = req.file && req.file.mimetype;
  const name = req.file && req.file.originalname;

  try{
      await Image(sequelize, DataTypes).create({ name, type, size, url, description});
    res
      .status(201)
      .send(`Successfully uploaded. Image URL: ${req.file.location}`)
  }catch (e) {
    await deleteImage(req.file.key);
    res.status(500).send("Internal server error");
  }

};

export default (req: any, res: any) =>
  upload(req, res, (err: any) => UploadFunc(req, res, err));
