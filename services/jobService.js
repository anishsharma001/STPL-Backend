import { containerClient } from "../utils/blobClient.js";
import transporter from "../utils/mailer.js";
import { v4 as uuidv4 } from "uuid";

const uploadToBlob = async (file) => {
  if (!file) return null;

  const blobName = `${uuidv4()}-${file.originalname}`;
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  await blockBlobClient.uploadData(file.buffer, {
    blobHTTPHeaders: { blobContentType: file.mimetype },
  });

  return blockBlobClient.url;
};

const handleJobApplication = async (data, files) => {
  try {
    const {
      firstName,
      lastName,
      email,
      contact,
      role,
      experience,
      skill,
      position,
      employmentType,
      availability,
      location,
      authorization,
      linkedin,
      portfolio,
    } = data;

    const name = `${firstName} ${lastName}`;

    /* ========= UPLOAD FILES ========= */

    const resumeUrl = await uploadToBlob(files?.resume?.[0]);
    const additionalUrl = await uploadToBlob(files?.additionalDocs?.[0]);

    /* ========= ADMIN EMAIL ========= */

    const adminHtml = `
      <h2>New Job Application</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Contact:</strong> ${contact}</p>
      <p><strong>Role:</strong> ${role}</p>
      <p><strong>Experience:</strong> ${experience}</p>
      <p><strong>Skill:</strong> ${skill}</p>
      <p><strong>Position Applied:</strong> ${position}</p>
      <p><strong>Employment Type:</strong> ${employmentType}</p>
      <p><strong>Availability:</strong> ${availability}</p>
      <p><strong>Location:</strong> ${location}</p>
      <p><strong>Authorization:</strong> ${authorization}</p>
      <p><strong>LinkedIn:</strong> ${linkedin}</p>
      ${portfolio ? `<p><strong>Portfolio:</strong> ${portfolio}</p>` : ""}

      <hr/>

      <p><strong>Resume:</strong> 
        ${resumeUrl ? `<a href="${resumeUrl}">${resumeUrl}</a>` : "Not Uploaded"}
      </p>

      ${
        additionalUrl
          ? `<p><strong>Additional Docs:</strong> 
              <a href="${additionalUrl}">${additionalUrl}</a>
            </p>`
          : ""
      }
    `;

    await transporter.sendMail({
      from: 'shekeramit@gmail.com',
      to: 'amit.kumar@zamplia.com',
      subject: "New Job Application Received",
      html: adminHtml,
    });

    /* ========= USER CONFIRMATION ========= */

    const userHtml = `
      <h2>Application Received</h2>
      <p>Dear ${name},</p>
      <p>Thank you for applying at STPL.</p>
      <p>We have received your application successfully.</p>
      <p>Our team will review your profile and get back to you shortly.</p>

      <p><strong>Resume:</strong> 
        ${resumeUrl ? `<a href="${resumeUrl}">View Uploaded Resume</a>` : ""}
      </p>

      <p>Best Regards,<br/>STPL Team</p>
    `;

    await transporter.sendMail({
      from: 'shekeramit@gmail.com',
      to: email,
      subject: "STPL | Application Received",
      html: userHtml,
    });

    return true;
  } catch (error) {
    console.error("Job Service Error:", error);
    throw error;
  }
};

export default handleJobApplication;
