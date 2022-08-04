import ProductRepository from "../domain/repositories/ProductRepository";
import CalculateShippingGateway from "./gateway/CalculateShippingGateway";

export default class SimulateShipping {

	constructor (readonly productRepository: ProductRepository, readonly calculateShippingGateway: CalculateShippingGateway) {
	}

	async execute (input: Input): Promise<Output> {
		const orderProducts = []
		for (const orderProduct of input.orderProducts) {
			const product = await this.productRepository.getProduct(orderProduct.idProduct);
			orderProducts.push({
				volume: product.getVolume(),
				density: product.getDensity(),
				quantity: orderProduct.quantity
			})
		}
		const output = await this.calculateShippingGateway.calculate({orderProducts})
		return {
			total: output.total
		}
	}
}

type Input = {
	orderProducts: { idProduct: number, quantity: number }[]
}

type Output = {
	total: number
}