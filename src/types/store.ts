export interface StoreCore {
  name: string
  tagline: string
  description: string
  logo: string
  favicon: string
  banner: string
  currency: Currency
}

export interface Currency {
  code: string
  symbol: string
  position: string
}



