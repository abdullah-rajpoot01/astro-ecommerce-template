export interface Branding {
  colors: Colors
  font: Font
}

export interface Colors {
  [key :string]: string

}

export interface Font {
  heading: string
  body: string
}
