"use server";

import { z } from "zod";
import nodemailer from "nodemailer";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  phone: z.string().optional(),
  category: z.enum(["wedding", "pre-wedding", "event", "other"]),
  preferredDate: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters."),
  honeypot: z.string().optional(),
});

export type ContactFormState = {
  message: string;
  status: "success" | "error" | "idle";
};

// Create a Nodemailer transporter using your environment variables
const emailPort = Number(process.env.EMAIL_PORT) || 587;
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: emailPort,
  secure: emailPort === 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const data = Object.fromEntries(formData.entries());
  
  if (data.honeypot) {
    console.warn("Spam detected.");
    return { status: "error", message: "Spam detected." };
  }
  
  const validatedFields = contactFormSchema.safeParse(data);

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      status: "error",
      message: "Please correct the errors in the form.",
    };
  }

  const { name, email, phone, category, preferredDate, message } = validatedFields.data;

  // Send email
  try {
    // Check if email configuration is available
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("Email configuration missing");
      return {
        status: "error",
        message: "Email service is not configured. Please contact support.",
      };
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.CLIENT_EMAIL || process.env.EMAIL_USER,
      subject: `New Booking Inquiry from ${name} - Vision Captures`,
      html: `
        <h2>New Booking Inquiry from Vision Captures Website</h2>
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
          <p><strong>Service of Interest:</strong> ${category}</p>
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
      `,
      replyTo: email, // Allow photographer to reply directly to customer
    };

    await transporter.sendMail(mailOptions);
    console.log("Form submitted and email sent successfully", validatedFields.data);
    
    return {
      status: "success",
      message: "Thank you for your message! We will get back to you shortly.",
    };

  } catch (error) {
    console.error("Email sending failed:", error);
    return {
      status: "error",
      message: "Something went wrong. Please try again later.",
    };
  }
}