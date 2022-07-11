import Dimension from "./Dimension";

export default class ShippingCalculator {
  MIN_SHIPPING_VALUE = 10.0

  constructor(
    readonly dimesion: Dimension,
    readonly distance: number
  ) {}

  calculate() {
    const value = this.distance * this.dimesion.calculateVolume() * (this.dimesion.calculateDensity() / 100)
    return value < this.MIN_SHIPPING_VALUE ? this.MIN_SHIPPING_VALUE : value
  };
}