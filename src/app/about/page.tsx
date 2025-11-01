import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Check, Heart, Camera, Lightbulb } from 'lucide-react';

const whyChooseUs = [
    {
        icon: Heart,
        text: "Passionate Storytelling: We don't just take pictures; we craft narratives that reflect your unique story."
    },
    {
        icon: Camera,
        text: "Professional & High-Quality: Using top-of-the-line equipment to deliver stunning, high-resolution images."
    },
    {
        icon: Lightbulb,
        text: "Creative & Artistic Vision: A unique artistic style that makes your photos stand out and feel timeless."
    },
    {
        icon: Check,
        text: "Personalized Experience: We work closely with you to ensure your vision is brought to life flawlessly."
    }
]

export default function AboutPage() {
  return (
    <div className="bg-card">
        <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div className="relative aspect-[3/4] group">
            <Image 
                src="https://placehold.co/600x800.png" 
                width={600} 
                height={800} 
                alt="Portrait of Vrusabh Panchal, the photographer" 
                loading="lazy"
                className="rounded-lg shadow-lg object-cover w-full h-full" 
                data-ai-hint="photographer portrait" 
            />
             <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
            </div>
            <div>
            <h1 className="font-headline text-4xl md:text-5xl font-bold">About Vrusabh Panchal</h1>
            <p className="mt-4 text-lg text-muted-foreground">
                {/* TODO: Add bio here */}
                With a passion for storytelling and an eye for the moments that matter, I founded Visionary Vault to turn fleeting expressions into timeless art. Photography isn't just my profession; it's my way of seeing the world and connecting with people. My goal is to create a comfortable, joyful experience for my clients, resulting in photos that are both beautiful and authentic.
            </p>

            <h2 className="font-headline text-2xl md:text-3xl font-bold mt-8">Why Choose Us?</h2>
            <ul className="mt-4 space-y-4">
                {whyChooseUs.map((item, index) => (
                    <li key={index} className="flex items-start gap-4">
                        <item.icon className="h-6 w-6 text-primary mt-1 shrink-0"/>
                        <span>{item.text}</span>
                    </li>
                ))}
            </ul>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg">
                <Link href="/contact">Book a Consultation</Link>
                </Button>
                <Button asChild size="lg" variant="secondary">
                <Link href="/portfolio">See My Work</Link>
                </Button>
            </div>
            </div>
        </div>
        </div>
    </div>
  );
}
