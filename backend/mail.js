const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "mysharet@gmail.com",
    pass: "tdyh sdzz ijng exht",
  },
});

const sendWelcomeEmail = (email, username) => {
  const mailOptions = {
    from: "mysharet@gmail.com",
    to: email,
    subject: "Welcome to KOKULAM!",
    text: `Hi ${username},

Welcome to KOKULAM!

We're thrilled to have you join our community. At KOKULAM, we are committed to providing you with the best products and services to meet your needs. Whether you're here for our latest collections or just browsing, we are here to make your shopping experience exceptional.

If you have any questions or need assistance, feel free to reach out to our customer support team. We're always here to help.

Thank you for choosing KOKULAM. We look forward to serving you!

Best regards,
The KOKULAM Team
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email: ", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = { sendWelcomeEmail };
