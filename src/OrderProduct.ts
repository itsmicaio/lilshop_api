import Product from "./Product";

export default class OrderProduct {
  quantity: number;

  constructor(
    readonly product: Product,
    quantity: number
  ) {
    this.quantity = quantity;
  }

  setQuantity(quantity: number) {
    if (quantity < 0) return false
    this.quantity = quantity
    return true
  }

  total(): number {
    return (this.product.price * this.quantity)
  }
}