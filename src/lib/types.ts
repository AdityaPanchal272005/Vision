export type PortfolioCategory = "All" | "Weddings" | "Pre-weddings" | "Events";

export interface PortfolioImage {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  category: Omit<PortfolioCategory, "All">;
  hint: string;
}

export interface ClientGalleryImage extends PortfolioImage {
  // Client galleries might have more specific properties in a real app
}

export interface Gallery {
  id: string;
  title: string;
  slug: string; // UUID
  coverPhoto: string;
  photos: ClientGalleryImage[];
  clientName: string;
  eventDate: string; // YYYY-MM-DD
}
