import CouponRepository from "../domain/repositories/CouponRepository";
import Order from "../domain/entities/Order";
import OrderRepository from "../domain/repositories/OrderRepository";
import ProductRepository from "../domain/repositories/ProductRepository";

export default class OrderService {
	constructor(
		readonly productRepository: ProductRepository,
		readonly couponRepository: CouponRepository,
		readonly orderRepository: OrderRepository,
	) {}

	async execute(input: Input): Promise<Output> {
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

		this.orderRepository.save(order)
		return {code: order.getCode()}
	}
}

type Input = {
	cpf: string,
	couponCode?: string,
	date?: Date,
	orderProducts: { idProduct: number, quantity: number }[]
}

type Output = {
	code: string,
}