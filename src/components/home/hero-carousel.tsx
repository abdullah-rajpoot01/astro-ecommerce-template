
import * as React from "react";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,

} from "@/components/ui/carousel";
import heroData from "@/content/sections/hero.json";

// We can read data in Astro frontmatter to pass to the island

export default function CarouselWithFooter() {
  const { carouselImages: images } = heroData;
  const [api, setApi] = React.useState<CarouselApi>();

  React.useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0); // go back to first slide
      }
    }, 3000); // change slide every 3 seconds

    return () => clearInterval(interval);
  }, [api]);

  return (
    <div className="mx-auto max-w-full relative rounded-full">
      <Carousel className="w-full max-w-full aspect-square p-0! border-0" setApi={setApi}>
        <CarouselContent>
          {images.map((img) => (
            <CarouselItem key={img.image}>
              {img.link ? (
                <a href={img.link}>
                  <img
                    alt="dddepth-248"
                    className="size-full aspect-square object-cover"
                    src={img.image}
                  />
                </a>
              ) : (
                <img
                  alt="dddepth-248"
                  className="size-full aspect-square object-cover"
                  src={img.image}
                />
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
