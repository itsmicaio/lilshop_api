import Product from "./Product";

export default class OrderProduct {
  quantity: number;

  constructor(
    readonly productId: number,
    readonly price: number,
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
    return (this.price * this.quantity)
  }
}