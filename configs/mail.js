const nodemailer = require("nodemailer");  

  // create reusable transporter object using the default SMTP transport
  var transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "8c87a0cc21cf08",
      pass: "2f5e004ceae184"
    }
  });

  module.exports = transporter;