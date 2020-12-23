import { s3, Multer } from "../../config/s3.config";
require("dotenv").config();

const bucket  = process.env.AWS_S3_BUCKET;

type Dependencies = {
  s3: { deleteObject: (data:any, cb: (err:any, data:any)=> void) => any },
  Multer: { single: (str: string) => any },
} 

export const S3Services = ( dependencies: Dependencies) => {
const { s3, Multer } = dependencies;
const UploadService = Multer;

const deleteImage = (key: string) => {
  return s3.deleteObject(
    {
      Bucket: bucket,
      Key: key,
    },
    function (err, data) {}
  );
};

const upload = UploadService.single("image");

return { upload, deleteImage}
}

export default S3Services({
  s3,
  Multer
});

