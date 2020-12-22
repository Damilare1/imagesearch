import { Pool } from "pg";
import { DBInteractor } from "../service/db.service";
import { UploadService } from "../service/s3.service";
import { ImageValidation } from "../validations/upload.validation";
import { DBConfig } from "../../config/database.config";

require('dotenv').config()

const pool = new Pool(DBConfig.database);

const DB = new DBInteractor(pool);
const InsertDBQuery = DB.InsertDBQuery;

const imageValidation = new ImageValidation();

const upload = UploadService.single("image");

const UploadFunc = (req: any, res: any, err: any) => {
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

  const successCb = () =>{
    res
      .status(201)
      .send(`Successfully uploaded. Image URL: ${req.file.location}`);}

  const errorCb = () => res.status(500).send("Internal server error");
  try{
    InsertDBQuery(
      [description, url, name, size, type],
      successCb,
      errorCb
    );  
  }catch(e){

  }
};

export default (req: any, res: any) =>
  upload(req, res, (err: any) => UploadFunc(req, res, err));
