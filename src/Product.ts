import Dimension from "./Dimension";

export default class Product {
  constructor(
    readonly productId: number,
    readonly description: string,
    readonly price: number,
    readonly dimension: Dimension
  ) {
    
  }
}