const nodemailer = require('nodemailer');

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail', // or another service
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password',
  },
});

const sendReservationEmail = async (userEmail, bookTitle) => {
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: userEmail,
    subject: 'Rezervimi i Librave',
    text: `Përshëndetje,

    Rezervimi i librit "${bookTitle}" është i suksesshëm!

    Faleminderit që përdorët shërbimin tonë.

    Me respekt,
    Ekipi i Bibliotekës`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email i dërguar me sukses');
  } catch (error) {
    console.error('Gabim gjatë dërgimit të emailit:', error);
  }
};

module.exports = { sendReservationEmail };
