import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "shekeramit@gmail.com",
    pass: "msqwdqjqbkczbfcs",
  },
});


// 🔥 Verify transporter connection
const verifyTransporter = async () => {
  try {
    await transporter.verify();
    console.log("✅ SMTP Server is ready to send emails");
  } catch (error) {
    console.error("❌ SMTP Configuration Error:", error.message);
  }
};

// Call verify immediately
verifyTransporter();

export default transporter;
