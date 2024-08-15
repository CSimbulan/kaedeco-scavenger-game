// const nodemailer = require("nodemailer");

// const sendEmail = async ({ to, subject, text, html }) => {
//   const transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST,
//     port: process.env.SMTP_PORT,
//     secure: false,
//     auth: {
//       user: process.env.SMTP_USER,
//       pass: process.env.SMTP_PASSWORD,
//     },
//   });

//   const emailOptions = {
//     from: `KaedeCo <${process.env.EMAIL_FROM}>`,
//     to,
//     subject,
//     text,
//     html,
//   };

//   // Sending email
//   transporter.sendMail(emailOptions, (err, info) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(info);
//     }
//   });
// };
const brevo = require('@getbrevo/brevo');


const sendEmail = async ({ to, subject, text, html }) => {
  let defaultClient = brevo.ApiClient.instance;

  let apiKey = defaultClient.authentications['api-key'];
  apiKey.apiKey = process.env.BREVO_API_KEY;
  
  let apiInstance = new brevo.TransactionalEmailsApi();
  let sendSmtpEmail = new brevo.SendSmtpEmail();
  
  sendSmtpEmail.subject = subject;
  sendSmtpEmail.htmlContent = html;
  sendSmtpEmail.sender = { "name": "KaedeQuest", "email": `KaedeCo <${process.env.EMAIL_FROM}>` };
  sendSmtpEmail.to = [
    { "email": to }
  ];
  sendSmtpEmail.replyTo = { "email": "example@brevo.com", "name": "sample-name" };
  sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
  sendSmtpEmail.params = { "parameter": "My param value", "subject": "common subject" };
  
  
  apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
    console.log('API called successfully. Returned data: ' + JSON.stringify(data));
  }, function (error) {
    console.error(error);
  });
};


module.exports = sendEmail;
