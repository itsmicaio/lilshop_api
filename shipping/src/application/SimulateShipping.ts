import ShippingCalculator from "../domain/entities/ShippingCalculator";

export default class SimulateShipping {

	constructor () {
	}

	async execute (input: Input): Promise<Output> {
		let total = 0;
		for (const orderProduct of input.orderProducts) {
			total += ShippingCalculator.calculate(orderProduct.volume, orderProduct.density) * orderProduct.quantity;
		}

		return {
			total
		}
	}
}

type Input = {
	orderProducts: { volume: number, density: number, quantity: number }[]
}

type Output = {
	total: number
}