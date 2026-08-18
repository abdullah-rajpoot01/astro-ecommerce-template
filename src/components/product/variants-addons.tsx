// src/components/products/ProductSidebarIsland.tsx
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Product, Variant, AddOn } from '@/types/product'

interface ProductSidebarIslandProps {
    product: Product
}

export default function ProductSidebarIsland({ product }: ProductSidebarIslandProps) {
    // Safely initialize variant state using the first array item if available
    const [activeVariant, setActiveVariant] = useState<Variant | null>(
        product.variants && product.variants.length > 0 ? product.variants[0] : null
    )
    const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([])
    const [quantity, setQuantity] = useState<number>(1)

    // Fallbacks to base product information if variants don't overwrite them
    const currentPrice = activeVariant?.price ?? product.price
    const comparePrice = activeVariant?.comparePrice ?? product.comparePrice
    const currentStock = activeVariant?.stock ?? product.stock

    // Compute sums efficiently during the render cycle
    const addOnsTotal = selectedAddOns.reduce((sum, item) => sum + item.price, 0)
    const finalTotalPrice = (currentPrice * quantity) + addOnsTotal

    // Auto-reset quantity configuration if the user switches choices to avoid stock overflows
    useEffect(() => {
        setQuantity(1)
    }, [activeVariant])

    const handleVariantClick = (variant: Variant, index: number) => {
        setActiveVariant(variant)
        // Dispatches global event with explicit structural detail
        window.dispatchEvent(
            new CustomEvent('product-variant-changed', { 
                detail: { index, variantId: variant.id } 
            })
        )
    }

    const toggleAddOn = (addOn: AddOn) => {
        setSelectedAddOns(prev =>
            prev.some(item => item.id === addOn.id)
                ? prev.filter(item => item.id !== addOn.id)
                : [...prev, addOn]
        )
    }

    const adjustQuantity = (amount: number) => {
        setQuantity(prev => {
            const nextQty = prev + amount
            if (nextQty < 1) return 1
            if (currentStock !== undefined && currentStock !== null && nextQty > currentStock) {
                return currentStock
            }
            return nextQty
        })
    }

    const handleAddToCart = () => {
        // Structured lightweight payload including current quantities
        const cartPayload = {
            productId: product.id,
            variantId: activeVariant?.id ?? null,
            addOnIds: selectedAddOns.map(addon => addon.id),
            quantity,
            finalTotalPrice
        }

        console.log('🛒 Item added to cart details:', cartPayload)
    }

    // Determine if product is fully unavailable
    const isOutOfStock = currentStock !== undefined && currentStock !== null && currentStock <= 0

    return (
        <div className='flex flex-col gap-6 lg:gap-8'>
            {/* Price Grid Header */}
            <div className='flex items-baseline gap-3 border-b pb-4'>
                <p className='text-2xl font-bold tracking-tight'>${currentPrice}</p>
                {comparePrice && comparePrice > currentPrice && (
                    <p className='text-lg text-muted-foreground line-through'>${comparePrice}</p>
                )}
                {product.saleLable && (
                    <span className='bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded'>{product.saleLable}</span>
                )}
            </div>

            {/* Variant Selection List */}
            {product.variants && product.variants.length > 0 && (
                <div className='flex flex-col gap-2'>
                    <h3 className='font-bold text-sm'>Select Option</h3>
                    <div className='flex flex-col gap-2 max-h-48 overflow-y-auto pr-1'>
                        {product.variants.map((variant, index) => {
                            const variantLabel = Object.values(variant.options).join(' / ')
                            const isSelected = activeVariant?.id === variant.id

                            return (
                                <Button
                                    key={variant.id}
                                    variant={isSelected ? 'default' : 'outline'}
                                    onClick={() => handleVariantClick(variant, index)}
                                    className="w-full h-11 justify-start px-4 text-left font-normal cursor-pointer rounded-lg"
                                    type="button"
                                >
                                    <span className="flex-1 truncate font-medium">{variantLabel}</span>
                                    {variant.price && (
                                        <span className={cn("text-sm font-semibold ml-2", isSelected ? "text-primary-foreground" : "text-muted-foreground")}>
                                            ${variant.price}
                                        </span>
                                    )}
                                </Button>
                            )
                        })}
                    </div>
                </div>
            )}

            {/* Upgrades Checkbox Options */}
            {product.addOns && product.addOns.length > 0 && (
                <div className='flex flex-col gap-2 border-t pt-4'>
                    <h3 className='font-bold text-sm'>Optional Upgrades</h3>
                    <div className='space-y-2'>
                        {product.addOns.map((addOn) => {
                            const isChecked = selectedAddOns.some(item => item.id === addOn.id);
                            return (
                                <label key={addOn.id} className={cn('flex items-center justify-between p-3 border rounded-lg cursor-pointer text-sm transition-all', isChecked ? 'bg-primary/5 border-primary/50' : 'hover:bg-muted/50')}>
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
            
            {((product.addOns && product.addOns.length > 0) || (product.variants && product.variants.length > 0)) && (
                <div className='border-t pt-4' />
            )}

            {/* Checkout Actions Panel */}
            <div className='flex flex-col gap-2 '>
                <div className='flex gap-4 items-center mb-1'>
                    <span className='text-sm font-medium text-muted-foreground'>Total Price:</span>
                    <span className='text-2xl font-bold text-foreground'>${finalTotalPrice}</span>
                </div>
                
                {/* Quantity and Cart Controls Row */}
                <div className='flex gap-3 items-center w-full'>
                    {!isOutOfStock && (
                        <div className='flex items-center border rounded-lg h-10 overflow-hidden bg-background shrink-0'>
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-full w-9 rounded-none font-semibold text-lg cursor-pointer"
                                onClick={() => adjustQuantity(-1)}
                                disabled={quantity <= 1}
                            >
                                −
                            </Button>
                            <span className="w-10 text-center font-semibold text-sm select-none">
                                {quantity}
                            </span>
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-full w-9 rounded-none font-semibold text-lg cursor-pointer"
                                onClick={() => adjustQuantity(1)}
                                disabled={currentStock !== undefined && currentStock !== null && quantity >= currentStock}
                            >
                                +
                            </Button>
                        </div>
                    )}
                    <Button 
                        className="h-10 px-6 flex-1 cursor-pointer font-semibold" 
                        size='lg' 
                        disabled={isOutOfStock}
                        onClick={handleAddToCart}
                    >
                        {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                    </Button>
                </div>
                {currentStock !== undefined && currentStock !== null && currentStock > 0 && (
                    <p className={cn("text-sm font-medium mt-1 mb-0", currentStock <= 5 ? "text-red-500" : "text-muted-foreground")}>
                        {currentStock <= 5 ? `Only ${currentStock} items left in stock!` : `Available Stock: ${currentStock} units`}
                    </p>
                )}
            </div>
        </div>
    )
}
