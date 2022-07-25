import ShippingCalculator from "../domain/entities/ShippingCalculator";
import ProductRepository from "../domain/repositories/ProductRepository";

export default class SimulateShipping {

	constructor (readonly productRepository: ProductRepository) {
	}

	async execute (input: Input): Promise<Output> {
		let total = 0;
		for (const orderProduct of input.orderProducts) {
			const item = await this.productRepository.getProduct(orderProduct.idProduct);
			total += ShippingCalculator.calculate(item) * orderProduct.quantity;
		}
		return {
			total
		}
	}
}

type Input = {
	orderProducts: { idProduct: number, quantity: number }[]
}

type Output = {
	total: number
}