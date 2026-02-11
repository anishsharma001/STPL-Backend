import transporter from "../utils/mailer.js";

const handleEnquiry = async (data) => {
  try {
    const {
      firstName,
      lastName,
      company,
      email,
      contact,
      service,
      otherService,
      message,
    } = data;

    const name = `${firstName} ${lastName}`;
    const organization = company || "N/A";
    const selectedService =
      service === "Other" ? otherService : service;

    /* ================= ADMIN EMAIL ================= */

    const adminHtml = `
      <h2>New Business Enquiry</h2>
      <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;">
        <tr><td><strong>Name:</strong></td><td>${name}</td></tr>
        <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
        <tr><td><strong>Contact:</strong></td><td>${contact}</td></tr>
        <tr><td><strong>Company:</strong></td><td>${organization}</td></tr>
        <tr><td><strong>Service:</strong></td><td>${selectedService}</td></tr>
      </table>

      <h3 style="margin-top:20px;">Message</h3>
      <p style="background:#f4f6f8;padding:12px;border-radius:6px;">
        ${message}
      </p>
    `;

    await transporter.sendMail({
      from: 'shekeramit@gmail.com',
      to: 'amit.kumar@zamplia.com',
      subject: "New Business Enquiry Received",
      html: adminHtml,
    });

    /* ================= USER ACKNOWLEDGEMENT ================= */

    const userSubject = "STPL | We’ve received your request";

    const userText = `
Dear ${name},

Thank you for contacting STPL.

We have successfully received your request. Our team is reviewing your message and will get back to you shortly.

Summary:
Organization: ${organization}
Email: ${email}

Your Message:
${message}

Best regards,
STPL Team
`;

    const userHtml = `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f4f6f8;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:20px;">
    <tr>
      <td align="center">
        <table width="700" cellpadding="0" cellspacing="0"
          style="background:#ffffff;border-radius:6px;overflow:hidden;">

          <tr>
            <td style="background:#4F46E5;color:#fff;padding:20px 24px;">
              <h2 style="margin:0;">STPL</h2>
              <p style="margin:4px 0 0;font-size:13px;opacity:.9;">
                Request Confirmation
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:24px;font-size:14px;color:#333;">
              <p>Dear <strong>${name}</strong>,</p>
              <p>
                Thank you for reaching out to STPL. We’ve received your request
                and our team will review it shortly.
              </p>

              <h3 style="color:#4F46E5;margin:20px 0 10px;">Request Summary</h3>
              <table width="100%" cellpadding="8" cellspacing="0"
                style="border-collapse:collapse;">
                <tr style="background:#f8f9fb;">
                  <td><strong>Organization</strong></td>
                  <td>${organization}</td>
                </tr>
                <tr>
                  <td><strong>Email</strong></td>
                  <td>${email}</td>
                </tr>
                <tr style="background:#f8f9fb;">
                  <td><strong>Mobile</strong></td>
                  <td>${contact}</td>
                </tr>
              </table>

              <h3 style="color:#4F46E5;margin:20px 0 10px;">Your Message</h3>
              <p style="background:#f8f9fb;padding:12px;border-radius:6px;">
                ${message}
              </p>

              <p style="margin-top:20px;">
                Our team will get back to you within 24 hours.
              </p>

              <p>
                Best regards,<br/>
                <strong>STPL Team</strong>
              </p>
            </td>
          </tr>

          <tr>
            <td style="background:#f8f9fb;padding:16px 24px;
                       font-size:12px;color:#666;">
              This is an automated confirmation email.<br/>
              Support: info@suvyavastha.com
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

    await transporter.sendMail({
      from: 'shekeramit@gmail.com',
      to: email,
      subject: userSubject,
      text: userText,
      html: userHtml,
    });

    return true;

  } catch (error) {
    console.error("Business Enquiry Service Error:", error);
    throw new Error("Failed to process business enquiry");
  }
};

export default { handleEnquiry };
