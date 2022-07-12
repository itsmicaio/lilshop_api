import Coupon from "./Coupon";
import Cpf from "./Cpf";
import OrderProduct from "./OrderProduct";
import Product from "./Product";
import ShippingCalculator from "./ShippingCalculator";

export default class Order {
  cpf: Cpf;
  products: OrderProduct[] = [];
  coupon?: Coupon;
  shipping: number = 0;

  constructor(cpf: string) {
    this.cpf = new Cpf(cpf)
  }

  addCoupon(coupon: Coupon) {
    if (new Date() > coupon.validUntil) throw new Error("This coupon is expired")
    this.coupon = coupon
  }

  addProduct(product: Product, quantity: number) {
    if (this.isProductAlreadyAdded(product)) throw new Error("Product is already added")
    this.products.push(new OrderProduct(product.productId, product.price, quantity))
    this.shipping += ShippingCalculator.calculate(product) * quantity
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
    const discount = this.coupon ? this.coupon.discountOf(sumOfProducts) : 0;
    const total = sumOfProducts + this.shipping - discount;
    return parseFloat(total.toFixed(2));
  }

  private isProductAlreadyAdded(newProduct: Product) {
    for (const orderProduct of this.products) {
      const checker = orderProduct.productId === newProduct.productId
      if (checker) return true;
    }
    return false
  }
}