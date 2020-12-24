import { Router } from "express";
import Upload from "../controller/upload.controller";
import Get from "../controller/image.controller";


const router = Router();

router.post("/", Upload.Upload);
router.get("/", Get.handleRequest);

export default router;

