import dotenv from "dotenv";

dotenv.config();

export const S3Config = {
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
