export const imageFilter = function (req: any, file: any, cb: any) {
  const unsupportedFormat = "Only JPEG/PNG Files are allowed!";
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
    req.fileValidationError = unsupportedFormat;
    return cb(new Error(unsupportedFormat), false);
  }

  cb(null, true);
};
