import { notFound } from 'next/navigation';
import { clientGalleries } from '@/lib/data';
import type { Metadata } from 'next';
import { GalleryGrid } from '@/components/GalleryGrid';

interface GalleryPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: GalleryPageProps): Promise<Metadata> {
  const gallery = clientGalleries.find((g) => g.slug === params.slug);
  return {
    title: gallery ? `${gallery.title} - Client Gallery` : 'Gallery Not Found',
    robots: {
      index: false,
      follow: false,
    },
  };
}

export function generateStaticParams() {
  return clientGalleries.map((gallery) => ({
    slug: gallery.slug,
  }));
}

export default function GalleryPage({ params }: GalleryPageProps) {
  const { slug } = params;
  const gallery = clientGalleries.find((g) => g.slug === slug);

  if (!gallery) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center mb-12">
        <p className="text-primary font-bold">CLIENT GALLERY</p>
        <h1 className="font-headline text-4xl md:text-5xl font-bold mt-2">{gallery.title}</h1>
        <p className="mt-2 text-muted-foreground">Client: {gallery.clientName}</p>
        <p className="text-sm text-muted-foreground">Event Date: {new Date(gallery.eventDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>
      <GalleryGrid images={gallery.photos} />
    </div>
  );
}
