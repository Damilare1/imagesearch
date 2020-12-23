import S3Services from "../service/s3.service";
import imageValidation from "../validations/upload.validation";
import { createInstance } from "../service/db.service";
import ESService from "../service/elasticsearch.service";

require("dotenv").config();

type UploadDependencies = {
  imageValidation: { validateImage: (req, res, err) => void };
  createInstance: (data: any) => any;
  ESService: { addDocument: (data: any) => any };
  deleteImage: (key: string) => any;
  upload: (req, res, cb: (err: any) => any) => any;
};

export const UploadController = (dependencies: UploadDependencies) => {
  const {
    imageValidation,
    createInstance,
    ESService,
    deleteImage,
    upload,
  } = dependencies;
  const UploadFunc = async (req: any, res: any, err: any) => {
    try {
      imageValidation.validateImage(req, res, err);
    } catch (err) {
      res.status(400).send(err.message);
      console.log(err.message);
      return err.message;
    }
    const { description } = req.body;
    const url = req.file && req.file.location;
    const size = req.file && req.file.size;
    const type = req.file && req.file.mimetype;
    const name = req.file && req.file.originalname;

    try {
      await createInstance({
        name,
        type,
        size,
        url,
        description,
      });
      await ESService.addDocument({ description, url, size, type, name });
      res
        .status(201)
        .send(`Successfully uploaded. Image URL: ${req.file.location}`);
    } catch (err) {
      await deleteImage(req.file.key);
      res.status(500).send("Internal server error");
      return err.message
    }
  };

  const Upload = (req: any, res: any) =>
    upload(req, res, (err: any) => UploadFunc(req, res, err));

  return { Upload, UploadFunc };
};

export default UploadController({
  imageValidation,
  createInstance,
  ESService,
  deleteImage: S3Services.deleteImage,
  upload: S3Services.upload,
});
