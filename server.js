const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.json()); // Parse JSON request bodies

// Endpoint to handle email sending
app.post('/send-email', (req, res) => {
    const { name, message, latitude, longitude } = req.body;

    // Configure Nodemailer transport
    const transporter = nodemailer.createTransport({
        service: 'gmail', // You can use another service if you want
        auth: {
            user: 'aryasatyabauddha2@gmail.com', // Replace with your email
            pass: '%IIT$Pilot#1000NASA@aryasatya_bauddha'     // Replace with your email password or app password
        }
    });

    const mailOptions = {
        from: 'your-email@gmail.com', // Sender address
        to: 'aryasatyabauddha2@gmail.com', // Receiver address
        subject: `${name} is reserving a seat!`,
        text: `Here are my coordinates:\n\nLatitude: ${latitude}\nLongitude: ${longitude}\n\nMessage: ${message}\n\nSent with love! 💖`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).send({ success: false, message: 'Error sending email.' });
        }
        console.log('Email sent: ' + info.response);
        res.status(200).send({ success: true, message: 'Email sent successfully!' });
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
