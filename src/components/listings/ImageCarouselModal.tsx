'use client';

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';
import { VisuallyHidden } from '@/components/ui/visually-hidden';

interface ImageCarouselModalProps {
  images: string[];
  startIndex: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ImageCarouselModal({
  images,
  startIndex,
  open,
  onOpenChange,
}: ImageCarouselModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 border-0 bg-transparent shadow-none">
        <VisuallyHidden>
          <DialogTitle>Image Carousel</DialogTitle>
        </VisuallyHidden>
        <Carousel
          opts={{
            startIndex: startIndex,
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="aspect-video relative">
                  <Image
                    src={image}
                    alt={`Property image ${index + 1}`}
                    fill
                    className="object-contain"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 bg-black/50 text-white hover:bg-black/70 border-none h-10 w-10" />
          <CarouselNext className="absolute right-4 bg-black/50 text-white hover:bg-black/70 border-none h-10 w-10" />
        </Carousel>
      </DialogContent>
    </Dialog>
  );
}
