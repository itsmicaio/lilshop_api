export default class ShippingCalculator {
  static MIN_SHIPPING_VALUE = 10.0;

  static calculate(volume: number, density: number, distance: number = 1000) {
    const value = distance * volume * (density / 100);
    if (!value) return 0;
    return Math.max(value, ShippingCalculator.MIN_SHIPPING_VALUE);
  };
}