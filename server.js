const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Use body-parser middleware to parse POST request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Handle POST requests to /submit-form
app.post('/submit-form', (req, res) => {
  // Handle form submission logic here
  // Access form data using req.body
  const formData = req.body;
  console.log(formData);

  // Save the form data to a file
  saveDataToFile(formData);

  // Send a response back to the client
  res.send('Form submitted successfully!');
});

// Handle POST requests to /verify-number
app.post('/verify-number', (req, res) => {
  // Handle number verification logic here
  // Access number data using req.body
  const { phoneNumber } = req.body;
  console.log(`Verifying phone number: ${phoneNumber}`);

  // Generate OTP
  const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false });
  console.log(`Generated OTP: ${otp}`);

  // Send OTP to the user's phone number
  sendOTP(phoneNumber, otp);

  // Save the OTP and phone number to a file (for demonstration purposes)
  saveNumberDataToFile({ phoneNumber, otp });

  // Send a response back to the client
  res.send('OTP sent successfully!');
});

// Function to save form data to a file
function saveDataToFile(formData) {
  const fileName = 'data/form-data.txt';
  const dataToWrite = JSON.stringify(formData, null, 2) + '\n\n';

  // Use fs.appendFile to append data without overwriting
  fs.appendFile(fileName, dataToWrite, 'utf8', (err) => {
    if (err) {
      console.error('Error appending to file:', err);
    } else {
      console.log('Form data appended to file:', fileName);
    }
  });
}

// Function to save number data to a file
function saveNumberDataToFile(numberData) {
  const fileName = 'data/number-data.txt';
  const dataToWrite = JSON.stringify(numberData, null, 2) + '\n\n';

  // Use fs.appendFile to append data without overwriting
  fs.appendFile(fileName, dataToWrite, 'utf8', (err) => {
    if (err) {
      console.error('Error appending to file:', err);
    } else {
      console.log('Number data appended to file:', fileName);
    }
  });
}

// Function to send OTP to the user's phone number
function sendOTP(phoneNumber, otp) {
  // Configure nodemailer with your email service credentials
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com', // Replace with your email
      pass: 'your-password' // Replace with your email password
    }
  });

  // Email configuration
  const mailOptions = {
    from: 'your-email@gmail.com', // Replace with your email
    to: phoneNumber, // Use phone number as the recipient for demonstration purposes
    subject: 'OTP Verification',
    text: `Your OTP is: ${otp}`
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
