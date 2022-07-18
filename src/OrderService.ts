import CouponRepository from "./CouponRepository";
import Order from "./Order";
import ProductRepository from "./ProductRepository";

export default class OrderService {
	constructor (readonly productRepository: ProductRepository, readonly couponRepository: CouponRepository) {
	}

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
}

type Input = {
	cpf: string,
	couponCode?: string,
	orderProducts: { idProduct: number, quantity: number }[]
}

type Output = {
	total: number,
	shipping: number,
	discount: number
}