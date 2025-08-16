import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, Calendar, Users, ArrowRight } from 'lucide-react';
import { portfolioImages } from '@/lib/data';
import Spline from '@splinetool/react-spline';

const services = [
  {
    icon: Heart,
    title: 'Weddings',
    description: 'Capturing the magic of your special day, from candid moments to grand portraits.',
  },
  {
    icon: Calendar,
    title: 'Pre-weddings',
    description: 'Tell your love story with a beautiful, personalized pre-wedding photoshoot.',
  },
  {
    icon: Users,
    title: 'Events',
    description: 'Professional coverage for corporate events, parties, and other special occasions.',
  },
];

const testimonials = [
  {
    name: 'Jessica & Tom',
    avatar: 'JT',
    image: 'https://placehold.co/100x100.png',
    hint: 'happy couple',
    text: "Vrusabh was an absolute dream to work with! The photos are breathtaking and capture our day perfectly. We couldn't be happier.",
  },
  {
    name: 'Aarav & Priya',
    avatar: 'AP',
    image: 'https://placehold.co/100x100.png',
    hint: 'smiling couple',
    text: "The pre-wedding shoot was so much fun, and the photos are just magical. Visionary Vault exceeded all our expectations.",
  },
  {
    name: 'Corporate Solutions Inc.',
    avatar: 'CS',
    image: 'https://placehold.co/100x100.png',
    hint: 'professional event',
    text: "Professional, punctual, and delivered a stunning gallery for our annual event. Highly recommended for any corporate function.",
  },
];

const featuredWork = portfolioImages.slice(0, 3);

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] w-full flex items-center justify-center text-center text-white overflow-hidden">
        <Spline
          scene="https://prod.spline.design/jbe4P1bCXGhYxXg7/scene.splinecode" 
          className="absolute inset-0 z-0 opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent z-10"></div>
        <div className="relative z-20 container mx-auto px-4">
          <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight text-shadow-lg">Capture Moments, Create Memories</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-foreground/80 font-body">
            Timeless photography for your most cherished occasions. We create art through the lens.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/portfolio">View Portfolio</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">Book Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Portfolio Strip */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">Featured Work</h2>
          <p className="mt-2 text-muted-foreground max-w-xl mx-auto">A glimpse into the stories we've helped tell.</p>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredWork.map((image) => (
              <Link href="/portfolio" key={image.id} className="group relative block overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  data-ai-hint={image.hint}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300"></div>
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="font-headline text-xl font-bold text-white text-shadow">{image.category}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">Our Services</h2>
          <p className="mt-2 text-muted-foreground max-w-xl mx-auto">Tailored packages to perfectly suit your needs.</p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {services.map((service) => (
              <Card key={service.title} className="bg-background/50 border-border hover:border-primary/50 transition-colors duration-300">
                <CardHeader className="flex flex-row items-center gap-4">
                  <service.icon className="h-10 w-10 text-primary" />
                  <CardTitle className="font-headline text-2xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">What Our Clients Say</h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="bg-card border-border text-left p-6">
                <CardContent className="p-0">
                  <blockquote className="text-muted-foreground italic">"{testimonial.text}"</blockquote>
                  <div className="flex items-center gap-4 mt-6">
                    <Avatar>
                      <AvatarImage src={testimonial.image} alt={testimonial.name} data-ai-hint={testimonial.hint} />
                      <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold text-foreground font-headline tracking-wide">{testimonial.name}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="py-20 bg-primary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">Ready to tell your story?</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Let's connect and discuss how we can bring your vision to life. Your moments are precious, let's make them unforgettable.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/contact">Get In Touch <ArrowRight className="ml-2 h-5 w-5" /></Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
