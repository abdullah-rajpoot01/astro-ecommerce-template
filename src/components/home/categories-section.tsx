
import {  buttonVariants } from '@/components/ui/button'
import { ShoppingBag } from 'lucide-react'
import { getCategoriesWithProductCount } from '@/utils/categories'
import CategoriesCard1 from '../products/categories-card'
import homePageData from "@/content/pages/home.json";
import { cn } from '@/lib/utils';

function CategoriesSection() {
  const { categoriesSection, setting } = homePageData;

  if (!categoriesSection || !setting?.categoriesEnabled) return null;

  const categories = getCategoriesWithProductCount();
  
  return (
    <section className='py-12'>
      <div className='mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mb-12 text-center'>
          <h2 className='text-3xl font-bold tracking-tight text-balance'>{categoriesSection.heading}</h2>
          {categoriesSection?.subHeading && <p className='text-muted-foreground mt-4 text-lg'>{categoriesSection.subHeading}</p>}
        </div>

        {/* Categories Grid */}
        <CategoriesCard1 categories={categories} maxCategories={categoriesSection.maxItems} />

        {/* Call to Action */}
        <div className='mt-12 text-center'>
          <a href='/categories'>
            <div className={cn(buttonVariants({ size: "lg" }), "h-10 px-4 cursor-pointer gap-2")}
            >
              <ShoppingBag className='size-5' />
              {categoriesSection.btnTxt}
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}


export default CategoriesSection
