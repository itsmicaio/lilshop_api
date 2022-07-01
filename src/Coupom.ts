export default class Coupom {
  constructor(
    readonly code: String,
    readonly discountPercentage: number
  ) {
    
  }

  discountOf(value: number) {
    const discount = value * (this.discountPercentage / 100)

    return discount
  }
}