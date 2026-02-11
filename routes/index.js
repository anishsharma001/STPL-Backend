import express from "express";
import testController from "../controller/testController.js";
import businessEnquiryController from "../controller/businessEnquiryController.js";
import transporter from "../utils/mailer.js";
import upload from "../middleware/upload.js";
import jobController from "../controller/jobController.js";

const router = express.Router();

router.get("/test", testController.test);
router.post("/business-inquiry", businessEnquiryController.enquiry);
router.post("/job", upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "additionalDocs", maxCount: 1 },
]),
    jobController.submitApplication
);

router.get("/mail-test", async (req, res) => {
    try {
        await transporter.sendMail({
            from: 'shekeamit@gmail.com',
            to: 'amit.kumar@zamplia.com',
            subject: "Test Email",
            text: "Email working!",
        });

        return res.status(200).json({
            success: true,
            message: "Mail sent successfully ✅",
        });

    } catch (error) {
        console.error("Mail Test Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to send email ❌",
            error: error.message,
        });
    }
});


export default router;
