const nodemailer = require("nodemailer");

module.exports = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  auth: {
    user: "appchathadinh@gmail.com",
    pass: "appchathadinh1233",
  },
});
