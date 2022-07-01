import OrderProduct from "./OrderProduct";
import Product from "./Product";

export default class Order {
  products: OrderProduct[] = []

  constructor() {

  }

  addProduct(product: Product) {
    this.products.push(new OrderProduct(product))
  }

  addProducts(products: Product[]) {
    for (var index in products) {
      this.addProduct(products[index])
    }
  }

  total() {
    return this.products.reduce(
      (total, currentProduct) => total + currentProduct.total(), 0
    )
  }
}