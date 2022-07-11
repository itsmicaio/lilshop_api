import OrderProduct from "./OrderProduct";
import Product from "./Product";

export default class ShippingCalculator {
  MIN_SHIPPING_VALUE = 10.0

  constructor(
    readonly orderProducts: OrderProduct[],
    readonly distance: number
  ) {}

  calculate() {
    const value = this.calculateAll()
    return value < this.MIN_SHIPPING_VALUE ? this.MIN_SHIPPING_VALUE : value
  };

  private calculateAll() {
    let acummulator = 0
    for (const orderProduct of this.orderProducts) {
      const dimension = orderProduct.dimension
      const value = this.distance * dimension.calculateVolume() * (dimension.calculateDensity() / 100)
      acummulator += value * orderProduct.quantity
    }
    return acummulator
  }
}