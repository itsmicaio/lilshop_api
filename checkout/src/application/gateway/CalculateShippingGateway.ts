export default interface CalculateShippingGateway {
  calculate(input: Input): Promise<Output>
}

export type Input = {
	orderProducts: { volume: number, density: number, quantity: number }[]
}

export type Output = {
	total: number
}