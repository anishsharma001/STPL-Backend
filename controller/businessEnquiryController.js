import businessEnquiryService from "../services/businessEnquiryService.js";

const businessEnquiryController = {
  enquiry: async (req, res) => {
    try {
      const data = req.body;

      await businessEnquiryService.handleEnquiry(data);

      return res.status(200).json({
        success: true,
        message: "Inquiry submitted successfully.",
      });
    } catch (error) {
      console.error("Business Enquiry Error:", error);
      return res.status(500).json({
        success: false,
        message: "Something went wrong.",
      });
    }
  },
};

export default businessEnquiryController;
