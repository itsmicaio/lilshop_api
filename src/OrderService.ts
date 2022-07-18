import Order from "./Order";
import ItemRepository from "./ProductRepository";

export default class OrderService {
	constructor (readonly productRepository: ItemRepository) {
	}

	async preview (input: Input): Promise<Output> {
		const order = new Order(input.cpf);
		for (const orderItem of input.orderProducts) {
			const item = await this.productRepository.getProduct(orderItem.idProduct);
			order.addProduct(item, orderItem.quantity);
		}
		const total = order.getTotal();
		const shipping = order.getShipping();
		return {
			total,
			shipping
		};
	}
}

type Input = {
	cpf: string,
	orderProducts: { idProduct: number, quantity: number }[]
}

type Output = {
	total: number,
	shipping: number
}