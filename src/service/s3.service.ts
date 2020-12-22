import AWS from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import { imageFilter } from "../helpers/imagefilter";
require('dotenv').config()

/*const s3 = new AWS.S3({
  accessKeyId: "AKIAIAT6MI3ABH2XHPQA",
  secretAccessKey: "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",
});*/

const credentials = {
  accessKeyId: 'ACCESSKEYAWSUSER',
  secretAccessKey: 'sEcreTKey',
}

const s3Server = process.env.AWS_S3_SERVER;
const s3 = new AWS.S3({
  credentials,
  endpoint: s3Server,
  s3ForcePathStyle: true
});

const bucket = process.env.S3BUCKET ? process.env.S3BUCKET: 'damilareimageuploadtest';

export const UploadService = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucket,
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
  s3.deleteObject({
    Bucket: bucket,
    Key: key,
  },function (err,data){})
}
