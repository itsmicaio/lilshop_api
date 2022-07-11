import Dimension from "./Dimension";

export default class ShippingCalculator {
  MIN_SHIPPING_VALUE = 10.0

  constructor(
    readonly dimesions: Dimension[],
    readonly distance: number
  ) {}

  calculate() {
    const value = this.calculateAll()
    return value < this.MIN_SHIPPING_VALUE ? this.MIN_SHIPPING_VALUE : value
  };

  private calculateAll() {
    let acummulator = 0
    for (const dimesion of this.dimesions) {
      acummulator += this.distance * dimesion.calculateVolume() * (dimesion.calculateDensity() / 100)
    }
    return acummulator
  }
}