import AWS from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import { imageFilter } from "../helpers/imagefilter";
import { S3Config } from "../../config/s3.config";
require("dotenv").config();

const s3 = new AWS.S3(S3Config.config);

const { bucket } = S3Config;

export const UploadService = multer({
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

export const deleteImage = (key: string) => {
  return s3.deleteObject(
    {
      Bucket: bucket,
      Key: key,
    },
    function (err, data) {}
  );
};
