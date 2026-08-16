import { Button, buttonVariants } from '@/components/ui/button'
import { getAllProducts } from '@/utils/products'
import { ShoppingBag } from 'lucide-react'
import ProductsCard1 from '../products/products-card'
import homePageData from "@/content/pages/home.json";
import { cn } from '@/lib/utils';


export function ProductCard1() {
  const { productsSection, setting } = homePageData
  if (!productsSection || !setting?.productsEnabled) return null;

  const products = getAllProducts();

  return (
    <section className='py-12 '>
      <div className='mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mb-12 text-center'>
          <h2 className='text-3xl font-bold tracking-tight text-balance'>{productsSection.heading}</h2>
          {productsSection?.subHeading && <p className='text-muted-foreground mt-4 text-lg'>{productsSection.subHeading}</p>}
        </div>
        <ProductsCard1 products={products} maxItems={productsSection.maxItems} />
      </div>
      {/* Call to Action */}
      <div className='mt-12 text-center'>
        <a href='/products'>
          <div  className={cn(buttonVariants({ size: "lg" }), "h-10 px-4 cursor-pointer gap-2")}>
            <ShoppingBag className='size-5' />
            {productsSection.btnTxt}
          </div>
        </a>
      </div>
    </section>
  )
}

export default ProductCard1
