import DistanceCalculator from "../domain/entities/DistanceCalculator";
import ShippingCalculator from "../domain/entities/ShippingCalculator";
import ZipcodeRepository from "../domain/repositories/ZipcodeRepository";

export default class SimulateShipping {

	constructor (readonly zipcodeRepository: ZipcodeRepository) {
	}

	async execute (input: Input): Promise<Output> {
		let total = 0;
		const from = await this.zipcodeRepository.getZipcode(input.from)
		const to = await this.zipcodeRepository.getZipcode(input.to)
		const distance = DistanceCalculator.calculate(from.coordinates, to.coordinates)
		for (const orderProduct of input.orderProducts) {
			total += ShippingCalculator.calculate(orderProduct.volume, orderProduct.density, distance) * orderProduct.quantity;
		}

		total = Math.round(total*100)/100;
		return {
			total
		}
	}
}

type Input = {
	from: string,
	to: string,
	orderProducts: { volume: number, density: number, quantity: number }[]
}

type Output = {
	total: number
}