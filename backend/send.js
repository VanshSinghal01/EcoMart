const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: true, 
  auth: {
    user: "singhalvansh74@gmail.com",
    pass: "wppzxylumdrymgtr",
  },
});

async function main(emailId , content) {
  try {
    const info = await transporter.sendMail({
      from:'" Eco Market" <singhalvansh74@gmail.com>', 
      to: emailId, 
      subject: 'Welcome to Eco Market!', 
      text: content,
      html:content,
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

module.exports = main;
