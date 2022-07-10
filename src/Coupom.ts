export default class Coupom {
  constructor(
    readonly code: string,
    readonly discountPercentage: number,
    readonly validUntil: Date
  ) {
    
  }

  discountOf(value: number) {
    const discount = value * (this.discountPercentage / 100)

    return discount
  }
}