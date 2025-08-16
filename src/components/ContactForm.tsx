"use client";

import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { submitContactForm, type ContactFormState } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const initialState: ContactFormState = {
  message: "",
  status: "idle",
};

function SubmitButton() {
    // This is a workaround to use useFormStatus in a component that is not a direct child of the form
    // The component using useFormStatus must be a child of the form. 
    // const { pending } = useFormStatus();
    const pending = false; // Placeholder

    return (
        <Button type="submit" className="w-full" size="lg" disabled={pending}>
            {pending ? "Sending..." : "Send Message"}
        </Button>
    )
}


export function ContactForm() {
  const [state, formAction] = useFormState(submitContactForm, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === 'success') {
      toast({
        title: "Success!",
        description: state.message,
      });
      formRef.current?.reset();
    } else if (state.status === 'error') {
      toast({
        variant: "destructive",
        title: "Error",
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <form ref={formRef} action={formAction} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" name="name" type="text" placeholder="John Doe" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" name="email" type="email" placeholder="john.doe@example.com" required />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number (Optional)</Label>
          <Input id="phone" name="phone" type="tel" placeholder="+1 (555) 123-4567" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Service of Interest</Label>
          <Select name="category" defaultValue="wedding">
            <SelectTrigger id="category">
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="wedding">Wedding</SelectItem>
              <SelectItem value="pre-wedding">Pre-wedding</SelectItem>
              <SelectItem value="event">Event</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="preferredDate">Preferred Date (Optional)</Label>
        <Input id="preferredDate" name="preferredDate" type="date" className="block w-full" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Your Message</Label>
        <Textarea id="message" name="message" placeholder="Tell us about your event..." required rows={5} />
      </div>
      <div className="absolute w-0 h-0 overflow-hidden">
        <Label htmlFor="honeypot">Do not fill this out</Label>
        <Input id="honeypot" name="honeypot" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Button type="submit" className="w-full" size="lg">Send Message</Button>
    </form>
  );
}
