import CouponRepository from "../domain/repositories/CouponRepository";
import Order from "../domain/entities/Order";
import OrderCodeGenerator from "../domain/entities/OrderCode";
import OrderRepository from "../domain/repositories/OrderRepository";
import ProductRepository from "../domain/repositories/ProductRepository";

export default class OrderService {
	constructor(
		readonly productRepository: ProductRepository,
		readonly couponRepository: CouponRepository,
		readonly orderRepository: OrderRepository,
	) {}

	async preview(input: Input): Promise<Output> {
		const order = new Order(input.cpf);
		for (const orderItem of input.orderProducts) {
			const item = await this.productRepository.getProduct(orderItem.idProduct);
			order.addProduct(item, orderItem.quantity);
		}

		if (input.couponCode){
			const coupon = await this.couponRepository.getCoupon(input.couponCode)
			order.addCoupon(coupon)
		}
		const total = order.getTotal();
		const shipping = order.getShipping();
		const discount = order.getDiscount();
		return {
			total,
			shipping,
			discount
		};
	}

	async checkout(input: Input): Promise<CheckoutOutput> {
		const sequence = await this.orderRepository.count() + 1
		const order = new Order(
			input.cpf,
			input.date,
			sequence
		);
		for (const orderItem of input.orderProducts) {
			const item = await this.productRepository.getProduct(orderItem.idProduct);
			order.addProduct(item, orderItem.quantity);
		}

		if (input.couponCode){
			const coupon = await this.couponRepository.getCoupon(input.couponCode)
			order.addCoupon(coupon)
		}

		this.orderRepository.saveOrder(order)
		return {code: order.getCode()}
	}
}

type Input = {
	cpf: string,
	couponCode?: string,
	date?: Date,
	orderProducts: { idProduct: number, quantity: number }[]
}

type CheckoutOutput = {
	code: string,
}

type Output = {
	total: number,
	shipping: number,
	discount: number
}