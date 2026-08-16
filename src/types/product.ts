export interface Product {
  id: string
  name: string
  category: string
  price: number
  comparePrice?: number
  stock?: number
  saleLable?: string
  images: string[]
  description?: string
  variants?: Variant[]
  addOns?: AddOn[]
  features?: string[]
  specifications?: Specification[]
  featured: boolean
  status: "draft" | "published"
}

export interface Variant {
  id: string
  sku?: string
  price?: number
  comparePrice?: number
  stock?: number
  options: Options
}

export interface Options {
  [key: string]: string
}

export interface AddOn {
  id: string
  name: string
  required: boolean
  price: number
}

export interface Specification {
  key: string
  value: string
}