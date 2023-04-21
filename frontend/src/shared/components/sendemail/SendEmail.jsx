import nodemailer from 'nodemailer';

const sendEmail = () => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your_email@gmail.com',
        pass: 'your_email_password'
    }
  });

  let mailOptions = {
    from: 'your_email@gmail.com', 
    to: 'recipient_email@example.com', 
    subject: 'Subject of your email', 
    text: 'Content of your email' 
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
  });
};

export { sendEmail };



