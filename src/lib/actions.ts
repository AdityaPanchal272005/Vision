"use server";

import { z } from "zod";

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

  // TODO: Implement Nodemailer logic here using environment variables for credentials.
  // This would involve setting up a transport and sending an email.
  const { name, email, phone, category, preferredDate, message } = validatedFields.data;
  console.log("Form data submitted:", { name, email, phone, category, preferredDate, message });

  // Simulate email sending
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Form submitted successfully", validatedFields.data);
    
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
