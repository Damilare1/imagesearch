import { s3, Multer } from "../../config/s3.config";
require("dotenv").config();

const bucket  = process.env.AWS_S3_BUCKET;

export const UploadService = Multer;

export const deleteImage = (key: string) => {
  return s3.deleteObject(
    {
      Bucket: bucket,
      Key: key,
    },
    function (err, data) {}
  );
};

export default UploadService.single("image");

