"use client";
import { Card, CardContent } from "@/modules/components//ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/modules/components//ui/carousel";

// import Autoplay from "embla-carousel-autoplay";

export default function CarouselDemo() {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-4">
      <Carousel
        className="w-full max-w-[12rem] sm:max-w-xs"
        opts={{
          dragFree: true,
        }}
      >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-4xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex justify-center items-center" />
        <CarouselNext className="hidden sm:flex justify-center items-center" />
      </Carousel>
      <Carousel
        className="w-full max-w-[12rem] sm:max-w-xs"
        // plugins={[Autoplay({ delay: 1000 })]}
        autoplay={1000}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-4xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex justify-center items-center" />
        <CarouselNext className="hidden sm:flex justify-center items-center" />
      </Carousel>
    </div>
  );
}
