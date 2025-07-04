# ExpressAid Web Application

A modern nursing care website with email functionality for nurse applications.

## Features

- Responsive design with Tailwind CSS
- Nurse application form with email notifications
- Mobile-friendly interface
- Professional healthcare-focused design

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Email Settings

You need to set up email credentials to receive application notifications. You have two options:

#### Option A: Environment Variables (Recommended)

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit the `.env` file with your email credentials:
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```

#### Option B: Direct Configuration

Edit `server.js` and replace the email configuration:

```javascript
const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com', // Your email
        pass: 'your-app-password'     // Your app password
    }
});
```

### 3. Gmail Setup (if using Gmail)

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
3. Use this app password in your configuration

### 4. Start the Server

```bash
# Production
npm start

# Development (with auto-restart)
npm run dev
```

The server will start on `http://localhost:3000`

## Form Fields

The nurse application form collects:

- **Name** (required)
- **Email** (required)
- **Phone Number** (required)
- **Nursing License Number** (required)
- **Years of Experience** (optional)
- **Specialization** (optional)
- **Certifications** (optional, multiple selection)

## Email Format

When someone submits an application, you'll receive an email with:

- Applicant's name and contact information
- License number and experience details
- Selected specialization and certifications
- Submission timestamp

## File Structure

```
ExpressAid_Web/
├── index.html          # Main website
├── styles.css          # Custom styles
├── server.js           # Express server with email functionality
├── package.json        # Dependencies
├── assets/             # Images and media files
└── README.md           # This file
```

## Troubleshooting

### Email Not Sending

1. Check your email credentials
2. Ensure you're using an app password (not your regular password)
3. Check if your email provider allows SMTP access
4. Verify the email service configuration in `server.js`

### Server Won't Start

1. Make sure all dependencies are installed: `npm install`
2. Check if port 3000 is available
3. Ensure Node.js is installed on your system

### Form Not Working

1. Make sure the server is running
2. Check browser console for JavaScript errors
3. Verify the form is submitting to the correct endpoint

## Security Notes

- Never commit your email credentials to version control
- Use environment variables for sensitive information
- Consider implementing rate limiting for production use
- Add input validation and sanitization for production

## License

MIT License - feel free to use and modify as needed. 