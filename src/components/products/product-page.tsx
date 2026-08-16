import { ProductOverview1 } from "@/components/product-overview-1"
import type { Product } from "@/types/product"


export default function ProductPage({ product }: { product: Product }) {
    return (
        <div className="flex min-h-svh w-full items-center justify-center">
            <div className="w-full">
                <ProductOverview1 product={product}/>
              
            </div>
        </div>
    )
}
