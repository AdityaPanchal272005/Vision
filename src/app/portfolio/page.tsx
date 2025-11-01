"use client";

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { portfolioImages, categories } from '@/lib/data';
import type { PortfolioCategory, PortfolioImage as ImageType } from '@/lib/types';
import Image from 'next/image';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export default function PortfolioPage() {
  const [filter, setFilter] = useState<PortfolioCategory>("All");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const filteredImages =
    filter === "All"
      ? portfolioImages
      : portfolioImages.filter((image) => image.category === filter);

  const handleNext = useCallback(() => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prevIndex) => (prevIndex! + 1) % filteredImages.length);
    }
  }, [selectedImageIndex, filteredImages.length]);

  const handlePrev = useCallback(() => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        (prevIndex) => (prevIndex! - 1 + filteredImages.length) % filteredImages.length
      );
    }
  }, [selectedImageIndex, filteredImages.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex !== null) {
        if (e.key === 'ArrowRight') handleNext();
        if (e.key === 'ArrowLeft') handlePrev();
        if (e.key === 'Escape') setSelectedImageIndex(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, handleNext, handlePrev]);

  const selectedImage = selectedImageIndex !== null ? filteredImages[selectedImageIndex] : null;

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Our Portfolio</h1>
        <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
          Explore our collection of captured moments, from intimate pre-wedding shoots to grand wedding celebrations and lively events.
        </p>
      </div>

      <div className="flex justify-center flex-wrap gap-2 my-12">
        {categories.map((category) => (
          <Button
            key={category}
            variant={filter === category ? "default" : "secondary"}
            onClick={() => setFilter(category)}
            className="capitalize"
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
        {filteredImages.map((image, index) => (
          <div key={image.id} className="break-inside-avoid group relative" onClick={() => setSelectedImageIndex(index)}>
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              data-ai-hint={image.hint}
              loading={index < 6 ? "eager" : "lazy"}
              priority={index < 6}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              className="rounded-lg shadow-lg hover:shadow-primary/50 transition-all duration-300 cursor-pointer w-full h-auto"
            />
             <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-lg"></div>
          </div>
        ))}
      </div>

      <Dialog open={selectedImage !== null} onOpenChange={(isOpen) => !isOpen && setSelectedImageIndex(null)}>
        <DialogContent className="max-w-7xl w-full h-full sm:h-auto bg-transparent border-none shadow-none p-0 flex items-center justify-center">
          {selectedImage && (
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                width={selectedImage.width}
                height={selectedImage.height}
                priority
                className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                data-ai-hint={selectedImage.hint}
              />
              <button onClick={() => setSelectedImageIndex(null)} className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/80 transition-colors z-50">
                <X className="w-6 h-6" />
                <span className="sr-only">Close</span>
              </button>
              <button onClick={handlePrev} className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/50 rounded-full p-2 hover:bg-black/80 transition-colors z-50">
                <ChevronLeft className="w-8 h-8" />
                <span className="sr-only">Previous image</span>
              </button>
              <button onClick={handleNext} className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/50 rounded-full p-2 hover:bg-black/80 transition-colors z-50">
                <ChevronRight className="w-8 h-8" />
                <span className="sr-only">Next image</span>
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
