const express = require("express");

const cron = require("node-cron");

// import { transporter } from "./mailer";

const { nodemailer, transporter } = require('./mailer');

const messageTest = "test de correos";

const app = express();
const port = process.env.PORT || 3001;

const axios = require('axios');
// const microservicioURL = 'https://jsonplaceholder.typicode.com/posts';
// const microservicioURL = 'http://localhost:3500/api/vehicles';

// const getDatos = async () => {
//     try {
//         const response = await axios.get(microservicioURL);

//         for(let i = 0; i < response.data.length; i++) {
//             console.log(response.data[i]._id);
//         }

//     } catch (error) {
//         console.error(error);
//     }

    // axios.get(microservicioURL)
    // .then(response => {
    //     console.log('Datos del microservicio:', response.data);
    // })
    // .catch(error => {
    //     console.error('Error al consumir el microservicio:', error);
    // });
// }

async function getVehicles() {
    try {
        const response = await axios.get('http://localhost:3500/api/vehicles');

        let listVehicles = [];

        for(let i = 0; i < response.data.length; i++) {
            listVehicles.push(response.data[i]._id); 
        }

        return listVehicles
    } catch (error) {
        console.error(error);
    }
}

const getDocuments = async () => {

    const listVehicles = await getVehicles();

    try {
        for(let i = 0; i < listVehicles.length; i++) {
            const response = await axios.get('http://localhost:3500/api/documentByVehicle/' + listVehicles[i]);
            console.log(response.data);
            //TODO: terminar la logica-> si la fecha es le quedan x días dar true
            if(true){
                //TODO: mandar notificacion de alerta a usuario
            }
        }

    } catch (error) {
        console.error(error);
    }
}

cron.schedule("*/30 * * * * *", () => {
    // getDocuments();
    sendEmail();
})



async function sendEmail(){
    // await transporter.sendMail({
    //     from: '"Servicio de envío de correos" <qyf8l@example.com>',
    //     to: 'luis.games1992@gmail.com',
    //     subject: 'Prueba de envío de correos',
    //     text: 'Este es un correo de prueba',
    //     html: '<b>Este es un correo de prueba</b> <p>${messageTest}</p>'
    // })

    const info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: "luis.games1992@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      });

      console.log("Message sent: %s", info.messageId);
}

// Ejecutar una vez al día a las 00:00
// cron.schedule('0 0 * * *', () => {
//     console.log('Tarea diaria ejecutada.');
//   });

// Ejecutar una vez a la semana los domingos a las 00:00
// cron.schedule('0 0 * * 0', () => {
//     console.log('Tarea semanal ejecutada.');
//   });

// async function main() {
   
// }

// main();


app.listen(port);
console.log("Server running on port: " + port);