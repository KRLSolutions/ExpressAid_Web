require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve static files from current directory

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail', // You can change this to your email provider
    auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com', // Replace with your email
        pass: process.env.EMAIL_PASS || 'your-app-password' // Replace with your app password
    }
});

// Route to serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route to handle nurse application form submission
app.post('/submit-application', async (req, res) => {
    console.log('Received application submission:', req.body);
    
    try {
        const {
            name,
            email,
            phone,
            license,
            experience,
            specialization,
            certifications
        } = req.body;

        // Validate required fields
        if (!name || !email || !phone || !license) {
            return res.status(400).json({
                success: false,
                message: 'Please fill in all required fields (name, email, phone, license)'
            });
        }

        // Create email content
        const emailContent = `
            <h2>New Nurse Application - ExpressAid</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>License Number:</strong> ${license}</p>
            <p><strong>Years of Experience:</strong> ${experience || 'Not specified'}</p>
            <p><strong>Specialization:</strong> ${specialization ? specialization.join(', ') : 'None specified'}</p>
            <p><strong>Certifications:</strong> ${certifications ? certifications.join(', ') : 'None specified'}</p>
            <br>
            <p><em>Application submitted on: ${new Date().toLocaleString()}</em></p>
        `;

        // Email options
        const mailOptions = {
            from: process.env.EMAIL_USER || 'your-email@gmail.com',
            to: process.env.EMAIL_RECEIVER || 'your-email@gmail.com', // Send to your email
            subject: `New Nurse Application - ${name}`,
            html: emailContent
        };

        // Send email (only if credentials are properly configured)
        const emailUser = process.env.EMAIL_USER || 'your-email@gmail.com';
        const emailPass = process.env.EMAIL_PASS || 'your-app-password';
        
        if (emailUser !== 'your-email@gmail.com' && emailPass !== 'your-app-password') {
            await transporter.sendMail(mailOptions);
            console.log('Email sent successfully');
        } else {
            console.log('Email not sent - using default credentials (test mode)');
        }

        res.json({
            success: true,
            message: 'Application submitted successfully! We will contact you soon.'
        });

    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to submit application. Please try again later.'
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Make sure to configure your email settings in the environment variables or update the code.');
}); 