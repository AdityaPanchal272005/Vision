import type { PortfolioImage, PortfolioCategory, Gallery } from './types';

export const categories: PortfolioCategory[] = ["All", "Weddings", "Pre-weddings", "Events"];

export const portfolioImages: PortfolioImage[] = [
  { id: 'w1', src: '/wedding/1.jpg', width: 800, height: 1200, alt: 'Bride and groom smiling', category: 'Weddings', hint: 'wedding couple' },
  { id: 'p1', src: '/Pre Wedding/1.jpg', width: 800, height: 1000, alt: 'Couple in a scenic landscape', category: 'Pre-weddings', hint: 'couple landscape' },
  { id: 'e1', src: '/Event/4.jpg', width: 1200, height: 800, alt: 'Corporate event with attendees', category: 'Events', hint: 'corporate event' },
  { id: 'w2', src: '/wedding/2.jpg', width: 800, height: 1000, alt: 'Detailed shot of wedding rings', category: 'Weddings', hint: 'wedding rings' },
  { id: 'p2', src: '/Pre Wedding/2.jpg', width: 800, height: 1200, alt: 'Couple posing in a city street', category: 'Pre-weddings', hint: 'couple city' },
  { id: 'e2', src: '/Event/3.jpg', width: 1200, height: 800, alt: 'Speaker at a conference', category: 'Events', hint: 'conference speaker' },
  { id: 'w3', src: '/wedding/3.jpg', width: 1200, height: 800, alt: 'Wedding ceremony venue', category: 'Weddings', hint: 'wedding venue' },
  { id: 'p3', src: '/Pre Wedding/3.jpg', width: 800, height: 1200, alt: 'Couple laughing together', category: 'Pre-weddings', hint: 'laughing couple' },
  { id: 'w4', src: '/wedding/4.jpg', width: 800, height: 1200, alt: 'Bride getting ready', category: 'Weddings', hint: 'bride portrait' },
  { id: 'e3', src: '/Event/1.jpg', width: 800, height: 1000, alt: 'Guests at a birthday party', category: 'Events', hint: 'birthday party' },
  { id: 'p4', src: '/Pre Wedding/4.jpg', width: 1200, height: 800, alt: 'Couple silhouette at sunset', category: 'Pre-weddings', hint: 'couple sunset' },
  { id: 'w5', src: '/wedding/5.jpg', width: 800, height: 1000, alt: 'Groom looking at bride', category: 'Weddings', hint: 'groom candid' },
];

export const clientGalleries: Gallery[] = [
    {
        id: '1',
        title: 'Jessica & Tom\'s Wedding',
        slug: 'a8a1c249-1d48-4395-9a84-a1a72d3f2f8a',
        coverPhoto: 'https://placehold.co/1200x800.png',
        photos: portfolioImages.filter(p => p.category === 'Weddings'),
        clientName: 'Jessica & Tom',
        eventDate: '2023-10-22',
    },
    {
        id: '2',
        title: 'Aarav & Priya\'s Pre-wedding Shoot',
        slug: 'b7c2b358-2e59-44a6-8b95-b2b83e4g3g9b',
        coverPhoto: 'https://placehold.co/1200x800.png',
        photos: portfolioImages.filter(p => p.category === 'Pre-weddings'),
        clientName: 'Aarav & Priya',
        eventDate: '2023-08-15',
    }
];
