const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'chauhanparth152@gmail.com', 
    pass: process.env.EMAIL_PASS || 'xvlf gyqs lauv cmwz' 
  }
});

router.post('/send', async (req, res) => {
  const { type, recipients, data } = req.body;

  if (!recipients || recipients.length === 0) {
    return res.status(400).json({ message: 'No recipients defined' });
  }

  try {
    let subject, htmlContent;

    if (type === 'COMPLAINT') {
      subject = `[URGENT] New Complaint: ${data.type} - Room ${data.roomNumber}`;
      htmlContent = `
        <h3>New Complaint Registered</h3>
        <p><strong>Type:</strong> ${data.type}</p>
        <p><strong>Student:</strong> ${data.studentName}</p>
        <p><strong>Room:</strong> ${data.roomNumber}</p>
        <p><strong>Description:</strong></p>
        <blockquote style="background: #f9f9f9; padding: 10px; border-left: 5px solid #d9534f;">
          ${data.description}
        </blockquote>
        <p>Please address this issue as soon as possible.</p>
      `;
    } else {
      subject = `[WEBSITE QUERY] ${data.subject}`;
      htmlContent = `
        <h3>New Contact Us Message</h3>
        <p><strong>From:</strong> ${data.name} (<a href="mailto:${data.email}">${data.email}</a>)</p>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <p><strong>Message:</strong></p>
        <blockquote style="background: #f9f9f9; padding: 10px; border-left: 5px solid #00bcD4;">
          ${data.message}
        </blockquote>
      `;
    }

    const mailOptions = {
      from: `"Hostel Hive Hub" <${process.env.EMAIL_USER || 'no-reply@hostel.com'}>`,
      to: recipients,
      subject: subject,
      html: htmlContent
    };

    const info = await transporter.sendMail(mailOptions);
    
    res.status(200).json({ message: 'Email sent successfully', info });

  } catch (error) {
    console.error("Nodemailer Error:", error);
    res.status(500).json({ message: 'Failed to send email', error: error.toString() });
  }
});

module.exports = router;

