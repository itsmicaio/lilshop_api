import Coupon from "./Coupon";
import Cpf from "./Cpf";
import OrderCode from "./OrderCode";
import OrderProduct from "./OrderProduct";
import Product from "./Product";
import ShippingCalculator from "./ShippingCalculator";

export default class Order {
  cpf: Cpf;
  products: OrderProduct[] = [];
  coupon?: Coupon;
  shipping: number = 0;
  code: OrderCode;

  constructor(
    cpf: string,
    readonly date: Date = new Date(),
    sequence: number = 1,
  ) {
    this.cpf = new Cpf(cpf)
    this.code = new OrderCode(date, sequence)
  }

  addCoupon(coupon: Coupon) {
    if (coupon.isExpired(this.date)) throw new Error("This coupon is expired")
    this.coupon = coupon
  }

  addProduct(product: Product, quantity: number) {
    if (this.isDuplicated(product)) throw new Error("Duplicated product")
    this.products.push(new OrderProduct(product.productId, product.price, quantity))
    this.shipping += ShippingCalculator.calculate(product) * quantity
  }

  addProducts(orderProducts: {product: Product, quantity: number}[]) {
    for (const orderProduct of orderProducts) {
      const {product, quantity} = orderProduct
      this.addProduct(product, quantity)
    }
  }

  getCode() {
    return this.code.value
  }

  getShipping() {
    return this.shipping
  }

  getDiscount(total: number = this.getSubtotal()) {
    return this.coupon ? this.coupon.discountOf(total) : 0;
  }

  getSubtotal() {
    const subtotal = this.products.reduce(
      (total, currentProduct) => total + currentProduct.total(), 0
    );
    return subtotal
  }

  getTotal() {
    const subtotal = this.getSubtotal()
    const discount = this.getDiscount()
    const total = subtotal + this.shipping - discount;
    return parseFloat(total.toFixed(2));
  }

  private isDuplicated(newProduct: Product) {
    return this.products.some(orderProduct => orderProduct.productId === newProduct.productId)
  }
}