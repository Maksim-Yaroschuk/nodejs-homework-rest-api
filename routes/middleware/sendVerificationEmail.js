const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");
dotenv.config();

const { SENDGRID_API_KEY, ADMIN_EMAIL } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

const sendVerificationEmail = async (email, verificationToken) => {
  try {
    const msg = {
      to: email,
      from: ADMIN_EMAIL,
      subject: "Confirmation of registration",
      html: `<p>Please, confirm your email <a href="http://localhost:3000/api/users/verify/${verificationToken}" target="_blank">${email}</a></p>`,
    };
    await sgMail.send(msg);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  sendVerificationEmail,
};
