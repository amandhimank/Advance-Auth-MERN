const nodemailer = require("nodemailer");
const { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_SUCESS } = require("./email.template");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS
  },
});

const sentOtpToEmail = async (email, verificationToken) => {
  try {
    const info = await transporter.sendMail({
      from: 'akdhimanak1@gmail.com', // sender address
      to: email, // list of receivers
      subject: "Verification OTP", // Subject line
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ), // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending verification email :", error);
    throw new Error(`Error sending verification email :`, error);
  }
}

const sendWelcomeEmail = async (email, name) => {
  try {
    const info = await transporter.sendMail({
      from: 'akdhimanak1@gmail.com', // sender address
      to: email, // list of receivers
      subject: "Account Verified", // Subject line
      html: VERIFICATION_SUCESS
    });
  
    console.log("Message sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending verification email :", error);
    throw new Error(`Error sending verification email :`, error);
  }
};

const sendResetEmail = async (email, resetUrl) => {
  try {
    const info = await transporter.sendMail({
      from: 'akdhimanak1@gmail.com', // sender address
      to: email, // list of receivers
      subject: "Reset Password", // Subject line
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace('{resetURL}', resetUrl)
    });
  
    console.log("Message sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending verification email :", error);
    throw new Error(`Error sending verification email :`, error);
  }
}

const sendResetSuccessEmail = async (email) => {
  try {
    const info = await transporter.sendMail({
      from: 'akdhimanak1@gmail.com', // sender address
      to: email, // list of receivers
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    });
  
    console.log("Message sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending verification email :", error);
    throw new Error(`Error sending verification email :`, error);
  }
}

module.exports = { sentOtpToEmail, sendWelcomeEmail, sendResetEmail, sendResetSuccessEmail };

