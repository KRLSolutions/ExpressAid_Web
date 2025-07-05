const nodemailer = require('nodemailer');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    context.log('Request method:', req.method);
    context.log('Request body:', JSON.stringify(req.body));

    // Enable CORS
    context.res = {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        }
    };

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        context.res.status = 200;
        return;
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
        context.res.status = 405;
        context.res.body = { success: false, message: 'Method not allowed' };
        return;
    }

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
            context.res.status = 400;
            context.res.body = {
                success: false,
                message: 'Please fill in all required fields (name, email, phone, license)'
            };
            return;
        }

        // Email configuration
        const emailUser = process.env.EMAIL_USER || 'your-email@gmail.com';
        const emailPass = process.env.EMAIL_PASS || 'your-app-password';
        
        context.log('Email configuration - User:', emailUser);
        context.log('Email configuration - Pass set:', !!emailPass);
        
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: emailUser,
                pass: emailPass
            }
        });

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
            to: process.env.EMAIL_RECEIVER || 'your-email@gmail.com',
            subject: `New Nurse Application - ${name}`,
            html: emailContent
        };

        // Send email (only if credentials are properly configured)
        if (emailUser !== 'your-email@gmail.com' && emailPass !== 'your-app-password') {
            await transporter.sendMail(mailOptions);
            context.log('Email sent successfully');
        } else {
            context.log('Email not sent - using default credentials (test mode)');
        }

        context.res.status = 200;
        context.res.body = {
            success: true,
            message: 'Application submitted successfully! We will contact you soon.'
        };

    } catch (error) {
        context.log.error('Error sending email:', error);
        context.res.status = 500;
        context.res.body = {
            success: false,
            message: 'Failed to submit application. Please try again later.'
        };
    }
}; 