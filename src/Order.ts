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

  addProduct(product: Product) {
    this.products.push(new OrderProduct(product))
  }

  addProducts(products: Product[]) {
    for (var index in products) {
      this.addProduct(products[index])
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
}