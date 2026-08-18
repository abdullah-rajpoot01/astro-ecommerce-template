import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel'
import type { AddOn, Product } from '@/types/product'
import type { Category } from '@/types/categories'

export function ProductOverview1({ product, category }: { product: Product, category: Category | null }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [carouselApi, setCarouselApi] = useState<CarouselApi>()

  // 1. Initialize active variant to the first entry if variants exist
  const [activeVariant, setActiveVariant] = useState(
    product.variants && product.variants.length > 0 ? product.variants[0] : null
  )
    // Track selected add-ons in a state array
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([])


  // 2. Resolve price and stock dynamically based on active selection
  const currentPrice = activeVariant?.price ?? product.price
  const comparePrice = activeVariant?.comparePrice ?? product.comparePrice
  const currentStock = activeVariant?.stock ?? product.stock

  // Calculate overall dynamic total including checked add-ons
  const addOnsTotal = selectedAddOns.reduce((sum, item) => sum + item.price, 0)
  const finalTotalPrice = currentPrice + addOnsTotal

  useEffect(() => {
    if (!carouselApi) return

    carouselApi.scrollTo(selectedImage)

    const handleSelect = () => {
      const currentIndex = carouselApi.selectedScrollSnap()
      setSelectedImage(currentIndex)
    }

    carouselApi.on('select', handleSelect)
    return () => {
      carouselApi.off('select', handleSelect)
    }
  }, [carouselApi, selectedImage])
  
  const toggleAddOn = (addOn: AddOn) => {
    setSelectedAddOns(prev => 
      prev.some(item => item.id === addOn.id)
        ? prev.filter(item => item.id !== addOn.id)
        : [...prev, addOn]
    )
  }
  return (
    <div>
      <section className='@container mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-20'>
        <div className='grid grid-cols-1 gap-6 py-4 lg:grid-cols-2 lg:gap-8 lg:py-6 xl:grid-cols-3 xl:gap-12 xl:py-12'>

          {/* Product Info Column */}
          <div className='flex flex-col justify-between gap-6 lg:gap-8'>
            <div className='flex flex-col gap-2 lg:gap-4'>
              <div className='flex items-center gap-2 flex-wrap'>
                {category?.name && <span className='text-sm font-semibold tracking-wide uppercase text-muted-foreground'>{category.name}</span>}
                {/* FIXED: Added Featured Badge */}
                {product.featured && (
                  <span className='bg-primary/10 text-primary text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full'>
                    ★ Staff Pick
                  </span>
                )}
              </div>
              <h2 className='text-xl font-bold tracking-tight text-balance lg:text-3xl'>{product.name}</h2>
              {product.description && <p className='text-muted-foreground text-balance'>{product.description}</p>}

              <div className='flex items-baseline gap-3'>
                <p className='text-2xl font-bold tracking-tight'>
                  ${currentPrice}
                </p>
                {comparePrice && comparePrice > currentPrice && (
                  <p className='text-lg text-muted-foreground line-through'>
                    ${comparePrice}
                  </p>
                )}
                {product.saleLable && (
                  <span className='bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded'>
                    {product.saleLable}
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnails */}

          </div>

          {/* Main Photo Slider Column */}
          <div className='row-span-2 row-start-1 lg:col-start-2'>
            <Carousel setApi={setCarouselApi} className='w-full'>
              <CarouselContent>
                {product.images?.map(image => (
                  <CarouselItem key={image}>
                    <img src={image} alt={image} className='w-full h-90 rounded-lg object-cover' />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            <div className='flex flex-wrap gap-4 mt-4'>
              {product.images?.map((image, index) => (
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

          {/* Unified Variant List Selector Column */}
          <div className='flex flex-col gap-6 lg:gap-10'>
            {product.variants && product.variants.length > 0 && (
              <div className='flex flex-col gap-2'>
                <h3 className='font-bold'>Select Option</h3>
                <div className='flex flex-col gap-2 max-h-60 overflow-y-auto pr-1'>
                  {product.variants.map((variant) => {
                    // Combine all available keys inside the variant options object separated by a clean slash
                    const variantLabel = Object.values(variant.options).join(' / ')
                    const isSelected = activeVariant?.id === variant.id

                    return (
                      <Button
                        key={variant.id}
                        variant={isSelected ? 'default' : 'outline'}
                        onClick={() => setActiveVariant(variant)}
                        className="w-full h-11 justify-start px-4 text-left font-normal cursor-pointer rounded-lg"
                      >
                        <span className="flex-1 truncate font-medium">{variantLabel}</span>
                        {variant.price && (
                          <span className={cn(
                            "text-sm font-semibold ml-2",
                            isSelected ? "text-primary-foreground" : "text-muted-foreground"
                          )}>
                            ${variant.price}
                          </span>
                        )}
                      </Button>
                    )
                  })}
                </div>
              </div>
            )}
 {/* FIXED: Added Add-ons Selection Interface Element */}
            {product.addOns && product.addOns.length > 0 && (
              <div className='flex flex-col gap-2 border-t pt-4 max-h-60 overflow-y-auto pr-1'>
                <h3 className='font-bold text-sm'>Optional Upgrades</h3>
                <div className='space-y-2'>
                  {product.addOns.map((addOn) => {
                    const isChecked = selectedAddOns.some(item => item.id === addOn.id);
                    return (
                      <label 
                        key={addOn.id} 
                        className={cn(
                          'flex items-center justify-between p-3 border rounded-lg cursor-pointer text-sm transition-all',
                          isChecked ? 'bg-primary/5 border-primary/50' : 'hover:bg-muted/50'
                        )}
                      >
                        <div className='flex items-center gap-3'>
                          <input 
                            type="checkbox" 
                            checked={isChecked}
                            onChange={() => toggleAddOn(addOn)}
                            className="rounded border-gray-300 text-primary focus:ring-primary size-4 accent-primary cursor-pointer"
                          />
                          <span className="font-medium text-foreground">{addOn.name}</span>
                        </div>
                        <span className="text-muted-foreground font-semibold">+${addOn.price}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Action Checkout Block */}
            <div className='flex flex-col gap-2'>
              <div className='flex gap-4'>
                <Button
                  className="h-10 px-8 flex-1 cursor-pointer"
                  size='lg'
                  disabled={currentStock !== undefined && currentStock !== null && currentStock <= 0}
                >
                  {currentStock !== undefined && currentStock !== null && currentStock <= 0
                    ? 'Out of Stock'
                    : 'Add to Cart'
                  }
                </Button>
              </div>

              {/* ALWAYS show stock if it is explicitly provided and greater than 0 */}
              {currentStock !== undefined && currentStock !== null && currentStock > 0 && (
                <p className={cn(
                  "text-sm font-medium",
                  currentStock <= 5 ? "text-red-500" : "text-muted-foreground"
                )}>
                  {currentStock <= 5
                    ? `Only ${currentStock} items left in stock!`
                    : `Available Stock: ${currentStock} units`
                  }
                </p>
              )}
            </div>

          </div>

        </div>


        {/* NEW: Features and Specifications Grid Section */}
        <div className='mt-12 border-t pt-12 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16'>

          {/* Features Column */}
          {product.features && product.features.length > 0 && (
            <div className='flex flex-col gap-4'>
              <h3 className='text-lg font-bold tracking-tight'>Key Features</h3>
              <ul className='space-y-2.5 list-none pl-0'>
                {product.features.map((feature, index) => (
                  <li key={index} className='text-muted-foreground text-sm flex items-start gap-2.5'>
                    <span className='text-primary font-semibold select-none mt-0.5'>✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Specifications Column */}
          {product.specifications && product.specifications.length > 0 && (
            <div className='flex flex-col gap-4'>
              <h3 className='text-lg font-bold tracking-tight'>Technical Specifications</h3>
              <div className='border rounded-lg overflow-hidden bg-card text-card-foreground'>
                <dl className='divide-y'>
                  {product.specifications.map((spec, index) => (
                    <div
                      key={index}
                      className={cn(
                        'grid grid-cols-3 gap-4 px-4 py-3 text-sm',
                        index % 2 === 0 ? 'bg-muted/30' : 'bg-transparent'
                      )}
                    >
                      <dt className='font-semibold text-foreground col-span-1 capitalize'>{spec.key}</dt>
                      <dd className='text-muted-foreground col-span-2 m-0'>{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          )}

        </div>

      </section>
    </div>
  )
}

export default ProductOverview1
