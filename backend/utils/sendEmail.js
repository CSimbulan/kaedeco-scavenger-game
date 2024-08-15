const SibApiV3Sdk = require('sib-api-v3-sdk');

const sendEmail = async ({ to, subject, html }) => {
  let defaultClient = SibApiV3Sdk.ApiClient.instance;;

  let apiKey = defaultClient.authentications["api-key"];
  apiKey.apiKey = process.env.BREVO_API_KEY;

  let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  sendSmtpEmail.subject = subject;
  sendSmtpEmail.htmlContent = html;
  sendSmtpEmail.sender = {
    name: "KaedeCo",
    email: `${process.env.EMAIL_FROM}`,
  };
  sendSmtpEmail.to = [{ email: to }];
  sendSmtpEmail.replyTo = { email: `${process.env.EMAIL_FROM}`, name: "KaedeCo" };

  await apiInstance.sendTransacEmail(sendSmtpEmail).then(
    function (data) {
      console.log(
        "API called successfully. Returned data: " + JSON.stringify(data)
      );
    },
    function (error) {
      console.error('Error sending email: ' + error);
    }
  );

};

module.exports = sendEmail;
