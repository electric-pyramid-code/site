// api/vercel.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { fullName, email, eventDetails, eventType, message } = req.body;

    // Set up the email transport configuration
    const transporter = nodemailer.createTransport({
      service: 'gmail',  // Or use another email provider if needed
      auth: {
        user: process.env.EMAIL_USER,  // Your email (from environment variables)
        pass: process.env.EMAIL_PASS,  // Your app password (for Gmail)
      },
    });

    const mailOptions = {
      from: email,  // Sender's email (user's email)
      to: process.env.RECEIVER_EMAIL,  // Your receiving email address
      subject: `New Contact Form Submission from ${fullName}`,
      text: `
        You have a new contact form submission:

        Name: ${fullName}
        Email: ${email}
        Event Details: ${eventDetails}
        Event Type: ${eventType}

        Message:
        ${message}
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({
        message: 'There was an error sending your message. Please try again later.',
        error: error.message,  // Send more error details to help debugging
      });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}