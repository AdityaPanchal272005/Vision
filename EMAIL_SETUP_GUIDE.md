# Email Setup Guide for Vision Captures

## Overview
This guide will help you set up email functionality for your Vision Captures photography website. The website uses **Nodemailer** to send booking inquiries from customers to the photographer's email.

## Packages Used
- **Nodemailer** (v7.0.6) - For sending emails
- **Next.js API Routes** - For handling email requests
- **Server Actions** - Alternative email sending method

## Setup Instructions

### 1. Create Environment Variables File
Create a `.env.local` file in your project root with the following variables:

```env
# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-photographer-email@gmail.com
EMAIL_PASS=your-app-password-here
CLIENT_EMAIL=your-photographer-email@gmail.com
```

### 2. Gmail Setup (Recommended)

#### Step 1: Enable 2-Factor Authentication
1. Go to your Google Account settings
2. Navigate to Security
3. Enable 2-Factor Authentication

#### Step 2: Generate App Password
1. In Google Account settings, go to Security
2. Under "2-Step Verification", click "App passwords"
3. Select "Mail" and your device
4. Copy the generated 16-character password
5. Use this password as `EMAIL_PASS` in your `.env.local` file

#### Step 3: Update Environment Variables
Replace the placeholder values in `.env.local`:
- `EMAIL_USER`: Your Gmail address
- `EMAIL_PASS`: The 16-character app password
- `CLIENT_EMAIL`: Your Gmail address (where you want to receive bookings)

### 3. Alternative Email Providers

If you prefer not to use Gmail, here are configurations for other providers:

#### Outlook/Hotmail
```env
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
EMAIL_USER=your-email@outlook.com
EMAIL_PASS=your-password
CLIENT_EMAIL=your-email@outlook.com
```

#### Yahoo Mail
```env
EMAIL_HOST=smtp.mail.yahoo.com
EMAIL_PORT=587
EMAIL_USER=your-email@yahoo.com
EMAIL_PASS=your-app-password
CLIENT_EMAIL=your-email@yahoo.com
```

#### Custom SMTP Server
```env
EMAIL_HOST=your-smtp-server.com
EMAIL_PORT=587
EMAIL_USER=your-email@yourdomain.com
EMAIL_PASS=your-password
CLIENT_EMAIL=your-email@yourdomain.com
```

## How It Works

### 1. Contact Form Submission
When a customer fills out the contact form:
1. Form data is validated using Zod schema
2. Data is sent to the API route (`/api/contact`)
3. Nodemailer creates an email with all form details
4. Email is sent to the photographer's email address

### 2. Email Content
The email includes:
- Customer's name and contact information
- Service of interest (Wedding, Pre-wedding, Event, Other)
- Preferred date
- Customer's message
- Reply-to address set to customer's email

### 3. Error Handling
- Form validation errors are shown to the user
- Email sending errors are logged and user is notified
- Spam protection with honeypot field

## Testing

### 1. Test Email Sending
1. Start your development server: `npm run dev`
2. Go to the contact page
3. Fill out the form with test data
4. Submit the form
5. Check your email for the booking inquiry

### 2. Check Console Logs
Monitor the console for any error messages:
- Email sending success/failure
- Validation errors
- SMTP connection issues

## Troubleshooting

### Common Issues

1. **"Invalid login" error**
   - Check if 2FA is enabled on your Gmail
   - Use App Password instead of regular password
   - Verify email address is correct

2. **"Connection timeout" error**
   - Check firewall settings
   - Verify SMTP host and port
   - Try different port (465 for SSL, 587 for TLS)

3. **"Authentication failed" error**
   - Double-check App Password
   - Ensure 2FA is enabled
   - Try regenerating App Password

4. **Emails not received**
   - Check spam/junk folder
   - Verify CLIENT_EMAIL is correct
   - Check email provider's sending limits

### Debug Mode
Add this to your `.env.local` for detailed logging:
```env
NODE_ENV=development
DEBUG=nodemailer:*
```

## Security Notes

1. **Never commit `.env.local` to version control**
2. **Use App Passwords for Gmail, not your main password**
3. **Regularly rotate your App Passwords**
4. **Consider using a dedicated email service for production**

## Production Considerations

For production deployment:
1. Set environment variables in your hosting platform
2. Consider using a dedicated email service (SendGrid, Mailgun, etc.)
3. Implement rate limiting to prevent spam
4. Add email templates for better formatting
5. Set up email delivery monitoring

## Support

If you encounter issues:
1. Check the console logs for error messages
2. Verify your environment variables
3. Test with a simple email first
4. Check your email provider's documentation

