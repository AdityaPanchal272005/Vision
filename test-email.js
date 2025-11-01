// Test script for email functionality
// Run this with: node test-email.js

const nodemailer = require('nodemailer');
require('dotenv').config({ path: '.env.local' });

async function testEmail() {
  console.log('Testing email configuration...');
  
  // Check environment variables
  const requiredVars = ['EMAIL_HOST', 'EMAIL_PORT', 'EMAIL_USER', 'EMAIL_PASS'];
  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.error('❌ Missing environment variables:', missingVars.join(', '));
    console.log('Please create a .env.local file with the required variables.');
    return;
  }
  
  console.log('✅ All environment variables are set');
  
  // Create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  
  // Test connection
  try {
    console.log('Testing SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection successful');
  } catch (error) {
    console.error('❌ SMTP connection failed:', error.message);
    return;
  }
  
  // Send test email
  try {
    console.log('Sending test email...');
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.CLIENT_EMAIL || process.env.EMAIL_USER,
      subject: 'Test Email from Vision Captures',
      html: `
        <h2>Test Email</h2>
        <p>This is a test email to verify that your email configuration is working correctly.</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
        <p>If you receive this email, your configuration is working! 🎉</p>
      `,
    };
    
    await transporter.sendMail(mailOptions);
    console.log('✅ Test email sent successfully!');
    console.log(`Check your inbox at: ${process.env.CLIENT_EMAIL}`);
    
  } catch (error) {
    console.error('❌ Failed to send test email:', error.message);
  }
}

testEmail().catch(console.error);
