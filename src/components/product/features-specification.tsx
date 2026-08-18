// src/components/products/ProductSpecsStatic.tsx
import type { Product } from '@/types/product'
import { cn } from '@/lib/utils'

export default function ProductSpecsStatic({ product }: { product: Product }) {
  return (
    <div className='mt-12 border-t pt-12 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16'>
      {/* Key Features */}
      {product.features && product.features.length > 0 && (
        <div className='flex flex-col gap-4'>
          <h3 className='text-lg font-bold tracking-tight text-foreground'>Key Features</h3>
          <ul className='space-y-2.5 list-none pl-0 m-0'>
            {product.features.map((feature, index) => (
              <li key={index} className='text-muted-foreground text-sm flex items-start gap-2.5'>
                <span className='text-primary font-semibold select-none mt-0.5'>✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Technical Specifications */}
      {product.specifications && product.specifications.length > 0 && (
        <div className='flex flex-col gap-4'>
          <h3 className='text-lg font-bold tracking-tight text-foreground'>Technical Specifications</h3>
          <div className='border rounded-lg overflow-hidden bg-card text-card-foreground'>
            <dl className='divide-y m-0'>
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
  )
}
