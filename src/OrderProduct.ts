import Product from "./Product";

export default class OrderProduct {
  quantity: number = 1

  constructor(
    readonly product: Product
  ) {
    
  }

  setQuantity(newQuantity: number) {
    this.quantity = (newQuantity > 0) ? newQuantity : this.quantity = 1
  }

  total(): number {
    return (this.product.price * this.quantity)
  }
}