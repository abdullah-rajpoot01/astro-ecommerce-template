
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel'
import {  productDetails } from "@/components/data/product-overview-1-data"
import type { Product } from '@/types/product'

export function ProductOverview1({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState<number | null>(productDetails.sizes[0])
  const [selectedColor, setSelectedColor] = useState(productDetails.colors[0])
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [carouselApi, setCarouselApi] = useState<CarouselApi>()

  useEffect(() => {
    if (!carouselApi) return

    // Set carousel to the selected image
    carouselApi.scrollTo(selectedImage)

    // Update selected image when carousel changes
    const handleSelect = () => {
      const currentIndex = carouselApi.selectedScrollSnap()
      setSelectedImage(currentIndex)
    }

    carouselApi.on('select', handleSelect)
    return () => {
      carouselApi.off('select', handleSelect)
    }
  }, [carouselApi, selectedImage])

  return (
    <div>
      {/* Product Details */}
      <section className='@container mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-20'>
        <div className='grid grid-cols-1 gap-6 py-4 lg:grid-cols-2 lg:gap-8 lg:py-6 xl:grid-cols-3 xl:gap-12 xl:py-12'>
          {/* Product Info */}
          <div className='flex flex-col justify-between gap-6 lg:gap-8'>
            <div className='flex flex-col gap-2 lg:gap-4'>
              <span className='text-sm font-semibold tracking-wide uppercase'>{product.category} —</span>
              <h2 className='text-xl font-bold tracking-tight text-balance lg:text-3xl'>{product.name}</h2>
              <p className='text-muted-foreground text-balance'>{product.description}</p>
              <p className='text-2xl font-bold tracking-tight'>
                {productDetails.currency}
                {product.price}
              </p>
            </div>

            {/* Thumbnails */}
            <div className='flex flex-wrap gap-4'>
              {product.images.map((image, index) => (
                <div
                  key={index}
                  onMouseEnter={() => setSelectedImage(index)}
                  className={cn(
                    'ring-offset-background size-16 cursor-pointer overflow-hidden rounded-sm ring-offset-2 transition-all lg:size-18',
                    selectedImage === index && 'ring-foreground ring-2',
                  )}
                >
                  <img src={image} alt={product.name} className='size-full object-cover' />
                </div>
              ))}
            </div>
          </div>

          {/* Main Image */}
          <div className='row-span-2 row-start-1 lg:col-start-2'>
            <Carousel setApi={setCarouselApi} className='w-full'>
              <CarouselContent>
                {product.images.map(image => (
                  <CarouselItem key={image}>
                    <img src={image} alt={image} className='w-full h-90 rounded-lg object-cover' />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>

          {/* Product Attributes */}
          <div className='flex flex-col gap-6 lg:gap-10'>
            {/* Size Selection */}
            <div className='flex flex-col gap-2'>
              <h3 className='font-bold'>Sizes</h3>
              <div className='flex flex-wrap gap-3'>
                {productDetails.sizes.map(size => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? 'default' : 'outline'}
                    onClick={() => setSelectedSize(size)}
                    className="h-9 px-4 py-2 size-12 cursor-pointer rounded-full p-0"
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className='flex flex-col gap-2'>
              <h3 className='font-bold'>Color</h3>
              <div className='flex gap-3'>
                {productDetails.colors.map(color => (
                  <Button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={cn('h-9 px-4 py-2',
                      'ring-offset-background size-8 cursor-pointer rounded-full ring-offset-2 transition-all',
                      selectedColor.name === color.name && 'ring-foreground ring-2',
                      selectedColor.name !== color.name &&
                        ['Black', 'White'].includes(color.name) &&
                        'outline-muted outline-solid',
                    )}
                    style={{ backgroundColor: color.value }}
                    aria-label={`Select ${color.name} color`}
                  />
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className='flex gap-4'>
              <Button className="h-10 px-8 flex-1 cursor-pointer" size='lg'>
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProductOverview1
