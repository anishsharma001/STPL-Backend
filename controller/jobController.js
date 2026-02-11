import handleJobApplication from "../services/jobService.js";

const jobController = {

    submitApplication: async (req, res) => {
        try {
            const data = req.body;
            const files = req.files;

            await handleJobApplication(data, files);

            return res.status(200).json({
                success: true,
                message: "Application submitted successfully.",
            });
        } catch (error) {
            console.error("Job Application Error:", error);
            return res.status(500).json({
                success: false,
                message: "Failed to submit application.",
            });
        }
    }

}

export default jobController;