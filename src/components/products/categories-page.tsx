import CategoriesCard1 from '@/components/products/categories-card'
import { getCategoriesWithProductCount } from '@/utils/categories'

function CategoriesPage() {
  const categories = getCategoriesWithProductCount()
  return (
    <section className='py-24'>
      <div className='mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mb-12 text-center'>
          <h2 className='text-3xl font-bold tracking-tight text-balance'>Shop By Category</h2>
          <p className='text-muted-foreground mt-4 text-lg'>Discover products across our most popular categories</p>
        </div>
        {/* Categories Grid */}
        <CategoriesCard1 categories={categories} />
      </div>
    </section>
  )
}


export default CategoriesPage
