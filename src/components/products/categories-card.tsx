import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import type { CategoryWithCount } from '@/utils/categories'
import { cn } from '@/lib/utils'

interface CategoriesCard1Prop {
    categories: CategoryWithCount[],
    maxCategories?: number,
}

function CategoriesCard1({ categories = [], maxCategories }: CategoriesCard1Prop) {
    if (maxCategories === 0) return null;
    let displayedCategories = maxCategories ? categories.slice(0, maxCategories) : categories;
    return (
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {displayedCategories.slice(0, 6).map(category => (
                <Card
                    key={category.id}
                    className='group cursor-pointer overflow-hidden py-0 transition-all duration-500 hover:shadow-lg'
                >
                    <div className='relative aspect-5/4 overflow-hidden'>
                        <img
                            src={category.image}
                            alt={category.name}
                            className='size-full object-cover transition-transform duration-500 group-hover:scale-105'
                        />
                        <div className='absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent' />

                        {/* Trending Badge */}
                        {category.trending ? <Badge className="px-2.5 py-0.5 font-semibold absolute rounded-sm top-4 left-4">Trending</Badge> : null}

                        {/* Category Info Overlay */}
                        <div className='absolute right-0 bottom-0 left-0 p-6 text-white'>
                            <h3 className='mb-1 text-xl font-bold'>{category.name}</h3>
                            <p className='mb-3 text-sm text-white/90'>{category.description}</p>
                            <div className='flex items-center justify-between'>
                                <span className='text-sm'>{category.count} items</span>
                                <a href={`/categories/${category.id}/1`}>
                                    <div

                                        className={cn(buttonVariants({ variant: "secondary", size: "sm" }), "h-8 px-3 text-xs cursor-pointer border-white/30 bg-white/20 text-white backdrop-blur-sm hover:bg-white/30")}

                                    >
                                        Browse
                                        <ArrowRight />
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </Card>
            ))}
        </div>


    )
}


export default CategoriesCard1
