import { Router } from "express";
import Upload from "../controller/upload.controller";

const router = Router();

router.post("/upload", Upload);

export default router;

