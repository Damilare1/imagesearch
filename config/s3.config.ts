import AWS from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import dotenv from "dotenv";

import { imageFilter } from "../helpers/imagefilter";

dotenv.config();

const S3Config = {
  config: {
    credentials: {
      accessKeyId: process.env.S3ACCESS,
      secretAccessKey: process.env.S3SECRETKEY,
    },
    endpoint: process.env.AWS_S3_SERVER,
    s3ForcePathStyle: true,
  },
  bucket: process.env.AWS_S3_BUCKET,
};

export const s3 = new AWS.S3(S3Config.config);

const { bucket } = S3Config;

export const Multer = multer({
  storage: multerS3({
    s3,
    bucket,
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
  fileFilter: imageFilter,
  limits: { fileSize: 500000 },
});
