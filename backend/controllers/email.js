const { createTransporter } = require('../oauth/oauthconfig');

const sendEmail = async (req, res, next) => {
    const { emailTo, subject, message } = req.body;
  
    try {
      const transporter = await createTransporter();
      let mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: emailTo,
        subject: subject,
        text: message
      };
  
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email sent successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  };

  const sendResetPasswordEmail = async (email,resetToken) => {
    const resetPasswordLink = `${process.env.NEWPASSWORD_URL}?token=${resetToken}&email=${email}`;
    try {
      const transporter = await createTransporter();
      let mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: 'Reset Password',
        text: `Click on the link to reset your password. ${resetPasswordLink}`
      };
  
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error(error);
      throw new Error('Error sending email');
    }
  };
  
module.exports = { sendEmail, sendResetPasswordEmail };

