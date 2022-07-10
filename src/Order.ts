import Coupom from "./Coupom";
import Cpf from "./Cpf";
import OrderProduct from "./OrderProduct";
import Product from "./Product";

export default class Order {
  cpf: Cpf;
  products: OrderProduct[] = [];
  coupom?: Coupom;

  constructor(cpf: string) {
    this.cpf = new Cpf(cpf)
  }

  addCoupom(coupom: Coupom) {
    this.coupom = coupom
  }

  addProduct(product: Product, quantity: number) {
    if (this.isProductAlreadyAdded(product)) throw new Error("Product is already added")
    this.products.push(new OrderProduct(product.productId, product.price, quantity))
  }

  addProducts(orderProducts: {product: Product, quantity: number}[]) {
    for (const orderProduct of orderProducts) {
      const {product, quantity} = orderProduct
      this.addProduct(product, quantity)
    }
  }

  total() {
    const sumOfProducts = this.products.reduce(
      (total, currentProduct) => total + currentProduct.total(), 0
    );
    const discount = this.coupom ? this.coupom.discountOf(sumOfProducts) : 0;
    const total = sumOfProducts - discount;
    return total;
  }

  private isProductAlreadyAdded(newProduct: Product) {
    for (const orderProduct of this.products) {
      const checker = orderProduct.productId === newProduct.productId
      if (checker) return true;
    }
    return false
  }
}