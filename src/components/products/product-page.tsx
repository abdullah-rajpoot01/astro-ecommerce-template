import { ProductOverview1 } from "@/components/product-overview-1"
import type { Category } from "@/types/categories"
import type { Product } from "@/types/product"


export default function ProductPage({ product, category }: { product: Product, category: Category | null }) {
    return (
        <div className="flex min-h-svh w-full items-center justify-center">
            <div className="w-full">
                <ProductOverview1 product={product} category={category} />

            </div>
        </div>
    )
}
