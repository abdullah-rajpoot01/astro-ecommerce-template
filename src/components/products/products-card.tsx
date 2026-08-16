import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Product } from '@/types/product'
import { cn } from '@/lib/utils'

interface ProductCardType {
    maxItems?: number,
    products: Product[]
}
function ProductsCard1({ maxItems, products = [], }: ProductCardType) {

    if (maxItems === 0) {
        return null;
    }

    const displayedProducts = maxItems ? products.slice(0, maxItems) : products;

    return (
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-6 xl:grid-cols-6'>
            {displayedProducts.map(product => (
                <Card
                    key={product.id}
                    className='flex flex-col gap-4 overflow-hidden rounded-lg py-4 shadow-none transition-shadow duration-300 hover:shadow-md relative'
                >
                    <CardContent className='flex flex-1 flex-col gap-4 px-4 '>

                        {/* Image container - Heart button removed */}
                        <div className='aspect-square overflow-hidden rounded-md relative'>
                            <div className='absolute top-4 left-2 z-10 flex flex-col gap-2'>

                                {product.comparePrice && product.comparePrice > product.price && (
                                    <Badge variant="destructive" className="rounded-full">
                                        {Math.round(
                                            ((product.comparePrice - product.price) / product.comparePrice) * 100
                                        )}
                                        % OFF
                                    </Badge>
                                )}
                                <Badge variant='secondary' className='rounded-full'>New</Badge>
                            </div>
                            <img
                                src={product.images[0]}
                                alt={product.name}
                                className='size-full rounded-md object-cover dark:brightness-[0.95] dark:invert'
                                loading='lazy'
                                width={400}
                                height={400}
                            />
                        </div>

                        <div className='flex flex-1 flex-col'>
                            <h2 className='mb-1 font-medium text-balance'>{product.name}</h2>
                            <div className='mt-auto flex items-baseline gap-2'>
                                <p className='font-semibold'>${product.price.toFixed(2)}</p>
                                {product.comparePrice && (
                                    <p className='text-muted-foreground text-sm line-through md:text-base xl:text-sm 2xl:text-base'>
                                        ${product.comparePrice.toFixed(2)}
                                    </p>
                                )}
                            </div>
                        </div>
                    </CardContent>

                    <CardFooter className='px-3 md:px-4 pt-0 bg-transparent border-t-0'>
                        <a href={`/products/${product.id}`} className='w-full'>
                            <div className={cn(buttonVariants({ size: "sm", variant:"outline" }), "h-8 px-3 w-full cursor-pointer text-sm")} >
                                Add to Cart
                            </div>
                        </a>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}

export default ProductsCard1
