// src/components/products/ProductInfoStatic.tsx
import type { Product } from '@/types/product'
import type { Category } from '@/types/categories'

interface Props {
  product: Product
  category: Category | null
}

export default function ProductInfoStatic({ product, category }: Props) {
  return (
    <div className='flex flex-col gap-2 lg:gap-4'>
      <div className='flex items-center gap-2 flex-wrap'>
        {category?.name && (
          <span className='text-sm font-semibold tracking-wide uppercase text-muted-foreground'>
            {category.name}
          </span>
        )}
        {product.featured && (
          <span className='bg-primary/10 text-primary text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full'>
            ★ Staff Pick
          </span>
        )}
      </div>

      <h1 className='text-xl font-bold tracking-tight lg:text-3xl text-foreground'>{product.name}</h1>
      {product.description && (
        <p className='text-muted-foreground text-sm leading-relaxed text-balance'>{product.description}</p>
      )}
    </div>
  )
}
