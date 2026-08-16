export interface Shipping {
  freeShippingThreshold?: number
  estimatedDelivery: string
  shippingMethods: ShippingMethod[]
}

export interface ShippingMethod {
  name: string
  price: number
}
