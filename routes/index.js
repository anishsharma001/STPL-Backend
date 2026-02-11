import express from "express";
import businessEnquiryController from "../controller/businessEnquiryController.js";
import upload from "../middleware/upload.js";
import jobController from "../controller/jobController.js";

const router = express.Router();

router.post("/business-inquiry", businessEnquiryController.enquiry);
router.post("/job", upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "additionalDocs", maxCount: 1 },
]),
    jobController.submitApplication
);


export default router;
