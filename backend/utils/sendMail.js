const nodemailer = require("nodemailer");

const sendMail = (otp, userMail) => {
  try {
    const auth = process.env.EMAIL;
    const auth_pass = process.env.PASSWORD;
    console.log(auth, auth_pass);
    const transport = nodemailer.createTransport({
      service: "GMAIL",
      auth: {
        user: auth,
        pass: auth_pass,
      },
    });

    const mailOptions = {
      from: auth,
      to: userMail,
      subject: "reset password otp",
      html: `<div>${otp}</div>`,
    };

    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        const error = new Error("unable to send email");
        error.statusCode = 400;
        throw error;
      } else {
        console.log("email is send", info.response);
      }
    });
  } catch (error) {
    throw error;
  }
};

module.exports = sendMail;
