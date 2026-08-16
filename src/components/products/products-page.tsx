import ProductsCard1 from '@/components/products/products-card';
import { getAllProducts } from '@/utils/products'


export function ProductsPage() {
  const products = getAllProducts();

  return (
    <section className='py-24'>
      <div className='mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8'>
        <h2 className='mb-8 text-center text-2xl font-bold text-balance md:text-3xl'>Discover Amazing Products.</h2>

        <ProductsCard1 products={products} />
      </div>
    </section>
  )
}

export default ProductsPage
