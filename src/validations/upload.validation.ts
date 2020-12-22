import multer from "multer";

export class ImageValidation {
  constructor() {}

  validateImage(req: any, res: any, err: any): void {
    if (req.fileValidationError) {
      throw new Error(req.fileValidationError)
    } else if (!req.file) {
      throw new Error("Error, please select an image of the appropriate size to upload")
    } else if (!req.body.description) {
      throw new Error("Please enter image description")
    } else if (err instanceof multer.MulterError) {
      throw new Error(err.message)
    } else if (err) {
      throw new Error(err.message)
    }
  }
}
