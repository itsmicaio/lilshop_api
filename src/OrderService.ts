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
		const total = order.total();
		return {
			total
		};
	}
}

type Input = {
	cpf: string,
	orderProducts: { idProduct: number, quantity: number }[]
}

type Output = {
	total: number
}