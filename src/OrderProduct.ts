import Product from "./Product";

export default class OrderProduct {
  quantity: number = 1

  constructor(
    readonly product: Product
  ) {
    
  }

  setQuantity(newQuantity: number) {
    if (newQuantity < 0) return false
    this.quantity = newQuantity
    return true
  }

  total(): number {
    return (this.product.price * this.quantity)
  }
}