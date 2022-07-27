import Product from "./Product";

export default class ShippingCalculator {
  static MIN_SHIPPING_VALUE = 10.0;

  static calculate(product: Product, distance: number = 1000) {
    const value = distance * product.getVolume() * (product.getDensity() / 100);
    if (!value) return 0;
    return Math.max(value, ShippingCalculator.MIN_SHIPPING_VALUE);
  };
}