export interface Address {
  addressLine1: string
  addressLine2: string
  city: string
  province: string
  postalCode: string
  country: string
  location: Location
}

export interface Location {
  latitude: number
  longitude: number
}
