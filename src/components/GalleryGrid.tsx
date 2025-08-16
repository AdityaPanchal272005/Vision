"use client";

import { useState, useEffect, useCallback } from 'react';
import type { PortfolioImage as ImageType } from '@/lib/types';
import Image from 'next/image';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface GalleryGridProps {
  images: ImageType[];
}

export function GalleryGrid({ images }: GalleryGridProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const handleNext = useCallback(() => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prevIndex) => (prevIndex! + 1) % images.length);
    }
  }, [selectedImageIndex, images.length]);

  const handlePrev = useCallback(() => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        (prevIndex) => (prevIndex! - 1 + images.length) % images.length
      );
    }
  }, [selectedImageIndex, images.length]);

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

  const selectedImage = selectedImageIndex !== null ? images[selectedImageIndex] : null;

  return (
    <div>
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
        {images.map((image, index) => (
          <div key={image.id} className="break-inside-avoid group relative" onClick={() => setSelectedImageIndex(index)}>
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              data-ai-hint={image.hint}
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
