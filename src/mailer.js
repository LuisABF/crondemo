
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'luis.games1992@gmail.com',
        pass: 'epzo bvnb ojuv emly'
    }
})

transporter.verify().then(() => {
    console.log('Listo para enviar correos');
})

module.exports = { nodemailer, transporter };