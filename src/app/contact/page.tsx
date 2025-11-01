import { ContactForm } from "@/components/ContactForm";
import { Mail, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-5xl mx-auto">
        <div className="text-center">
            <h1 className="font-headline text-4xl md:text-5xl font-bold">Get In Touch</h1>
            <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
                Have a question or ready to book your session? Fill out the form, and we&apos;ll get back to you as soon as possible.
            </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-16 items-start mt-16">
            <div className="lg:pr-8">
            <h2 className="font-headline text-2xl md:text-3xl font-bold">Contact Information</h2>
            <p className="mt-2 text-muted-foreground">
                For direct inquiries, feel free to reach out via email or phone. We look forward to hearing from you!
            </p>
            <div className="mt-8 space-y-4">
                <div className="flex items-center gap-4">
                <Mail className="h-6 w-6 text-primary shrink-0" />
                <a href="mailto:adityapanchal272005@gmail.com" className="text-lg hover:text-primary transition-colors break-all">adityapanchal272005@gmail.com</a>
                </div>
                <div className="flex items-center gap-4">
                <Phone className="h-6 w-6 text-primary shrink-0" />
                <a href="tel:+8320812620" className="text-lg hover:text-primary transition-colors">8320812620</a>
                </div>
            </div>
            </div>
            <div className="bg-card p-8 rounded-lg border border-border">
            <ContactForm />
            </div>
        </div>
      </div>
    </div>
  );
}

// filepath: d:\Vision\Vision-main\src\app\api\contact\route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  const { name, email, message } = await request.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "adityapanchal272005@gmail.com",
      pass: "Ad@020705", // Use Gmail App Password
    },
  });

  await transporter.sendMail({
    from: email,
    to: "adityapanchal272005@gmail.com",
    subject: `New Contact Form Message from ${name}`,
    text: message,
  });

  return NextResponse.json({ success: true });
}
