import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, email, message, phone, category, preferredDate } = await request.json();

    // Create transporter using environment variables
    const port = Number(process.env.EMAIL_PORT) || 587;
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "smtp.gmail.com",
      port,
      secure: port === 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Create HTML email content
    const htmlContent = `
      <h2>New Booking Inquiry from Vision Captures Website</h2>
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Service of Interest:</strong> ${category || 'N/A'}</p>
        <p><strong>Preferred Date:</strong> ${preferredDate || 'N/A'}</p>
        <p><strong>Message:</strong></p>
        <p style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
          ${message}
        </p>
        <hr style="margin: 20px 0;">
        <p style="color: #666; font-size: 12px;">
          This email was sent from the Vision Captures contact form.
        </p>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.CLIENT_EMAIL || process.env.EMAIL_USER,
      subject: `New Booking Inquiry from ${name} - Vision Captures`,
      html: htmlContent,
      replyTo: email, // Allow photographer to reply directly to customer
    });

    return NextResponse.json({ 
      success: true, 
      message: "Email sent successfully" 
    });

  } catch (error) {
    console.error("Email sending failed:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: "Failed to send email" 
      },
      { status: 500 }
    );
  }
}