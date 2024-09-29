const { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE } = require("./email.template");
const { mailtrap_client, sender } = require("./mailtrap.config");

const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrap_client.send({
      from: sender,
      to: recipient,
      subject: "Verify your email address",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email Verification",
    });

    console.log("Email sent successfully", response);
  } catch (error) {
    console.error("Error sending verification email :", error);
    throw new Error(`Error sending verification email :`, error);
  }
};

const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrap_client.send({
      from: sender,
      to: recipient,
      template_uuid: "68609f9d-7921-4ec2-8523-88350ab3a353",
      template_variables: {
        company_info_name: "Dhiman Auth",
        name: name,
      },
    });

    console.log("Welcome email sent successfully:", response);
  } catch (err) {
    console.error("Error sending welcome email :", err);
    throw new Error(`Error sending welcome email :`, err);
  }
};

const sendResetEmail = async (email, resetUrl) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrap_client.send({
      from: sender,
      to: recipient,
      subject: "Reset Password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace('{resetURL}', resetUrl),
      category: "Reset Password"
    });
    console.log("Reset email sent successfully:", response);
  }
  catch(err) {
    console.error("Error sending reset email :", err);
    throw new Error("Error sending reset email :", err);
  }
}

const sendResetSuccessEmail = async (email) => {
  try {
    const recipient = [{ email }];

    const response = await mailtrap_client.send({
      from: sender,
      to: recipient,
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password Reset Successful"
    });
    console.log("Reset email sent successfully:", response);
  }
  catch(err) {
    console.error("Error sending reset success email :", err);
    throw new Error("Error sending reset success email :", err);
  } 
}

module.exports = { sendVerificationEmail, sendWelcomeEmail, sendResetEmail, sendResetSuccessEmail };
