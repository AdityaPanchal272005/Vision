import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"
import Link from "next/link"

const packages = [
  {
    name: "Essential",
    price: "Starting at $1,800",
    description: "Perfect for intimate weddings and essential coverage.",
    features: [
      "6 hours of coverage",
      "Single photographer",
      "Online gallery",
      "200 high-resolution edited photos",
    ],
    popular: false,
  },
  {
    name: "Signature",
    price: "Starting at $3,500",
    description: "Our most popular package for a comprehensive wedding day story.",
    features: [
      "8 hours of coverage",
      "Two photographers",
      "Engagement session included",
      "Online gallery + USB drive",
      "400 high-resolution edited photos",
      "12x12 custom album",
    ],
    popular: true,
  },
  {
    name: "Luxe",
    price: "Starting at $5,500",
    description: "The ultimate experience, capturing every detail.",
    features: [
      "Full day coverage (up to 12 hours)",
      "Two photographers + assistant",
      "Luxury engagement session",
      "Full online gallery with prints",
      "600+ high-resolution edited photos",
      "Premium 14x14 leather album",
    ],
    popular: false,
  },
];

const faqs = [
  {
    question: "How do we book you for our wedding?",
    answer: "Booking is simple! Just fill out the contact form with your details, and we'll schedule a consultation to discuss your big day. A signed contract and a 50% retainer are required to secure your date.",
  },
  {
    question: "When will we receive our photos?",
    answer: "You'll receive a sneak peek gallery within 72 hours of your wedding. The full gallery will be delivered within 6-8 weeks for weddings and 2-3 weeks for other sessions.",
  },
  {
    question: "Do you travel for weddings?",
    answer: "Absolutely! I love traveling for weddings. Travel fees may apply for locations outside of a 50-mile radius. Please contact me for a custom quote for destination weddings.",
  },
  {
    question: "Can we customize a package?",
    answer: "Yes, packages can be customized to fit your specific needs. We can add or remove hours, sessions, albums, and other a la carte items to create the perfect package for you.",
  },
];

export default function PackagesPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Our Packages</h1>
        <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
          Choose the perfect package for your special day. Each one is crafted with love and attention to detail.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {packages.map((pkg) => (
          <Card key={pkg.name} className={`flex flex-col h-full ${pkg.popular ? 'border-primary shadow-primary/20 shadow-lg' : 'border-border'}`}>
            {pkg.popular && <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-bold rounded-t-lg">Most Popular</div>}
            <CardHeader className="text-center">
              <CardTitle className="font-headline text-3xl">{pkg.name}</CardTitle>
              <CardDescription>{pkg.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-4xl font-bold text-center mb-6">{pkg.price}</p>
              <ul className="space-y-3">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full" variant={pkg.popular ? "default" : "secondary"}>
                <Link href="/contact">Book {pkg.name}</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-24 max-w-4xl mx-auto">
        <h2 className="font-headline text-3xl md:text-4xl font-bold text-center">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full mt-8">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-bold">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}
