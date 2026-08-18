// src/components/products/ProductCarouselIsland.tsx
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel'
import type { Product } from '@/types/product'

export default function ProductCarouselIsland({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [carouselApi, setCarouselApi] = useState<CarouselApi>()

// src/components/products/ProductCarouselIsland.tsx

// Change this:
useEffect(() => {
  if (!carouselApi) return
  carouselApi.scrollTo(selectedImage)

  const handleSelect = () => {
    setSelectedImage(carouselApi.selectedScrollSnap())
  }

  // FIX: Wrap these in curly braces so they don't implicitly return a value
  carouselApi.on('select', handleSelect)
  return () => {
    carouselApi.off('select', handleSelect)
  }
}, [carouselApi, selectedImage])

  return (
    <div className='flex flex-col gap-4 w-full'>
      <Carousel setApi={setCarouselApi} className='w-full'>
        <CarouselContent>
          {product.images?.map((image, idx) => (
            <CarouselItem key={idx}>
              <img src={image} alt={product.name} className='w-full h-90 rounded-lg object-cover' />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      
      <div className='flex flex-wrap gap-3'>
        {product.images?.map((image, index) => (
          <button
            key={index}
            onMouseEnter={() => { setSelectedImage(index); carouselApi?.scrollTo(index); }}
            onClick={() => { setSelectedImage(index); carouselApi?.scrollTo(index); }}
            className={cn(
              'ring-offset-background size-16 cursor-pointer overflow-hidden rounded-md ring-offset-2 transition-all p-0 border-0',
              selectedImage === index ? 'ring-foreground ring-2 opacity-100' : 'opacity-60 hover:opacity-100'
            )}
            type="button"
          >
            <img src={image} alt="preview" className='size-full object-cover' />
          </button>
        ))}
      </div>
    </div>
  )
}
