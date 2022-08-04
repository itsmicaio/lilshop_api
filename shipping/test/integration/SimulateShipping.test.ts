import SimulateShipping from "../../src/application/SimulateShipping";
import AxiosGateway from "../../src/infra/gateway/AxiosGateway";
import BrasilApiHttpGateway from "../../src/infra/gateway/BrasilApiHttpGateway";
import ZipcodeGatewayRepository from "../../src/infra/repositories/ZipcodeGatewayRepository";

test("Deve simular o frete", async function () {
	const brazilApiAxiosGateway = new AxiosGateway("https://brasilapi.com.br/api")
	const brasilApiGateway = new BrasilApiHttpGateway(brazilApiAxiosGateway)
	const zipcodeRepository = new ZipcodeGatewayRepository(brasilApiGateway)
	const simulateFreight = new SimulateShipping(zipcodeRepository);
	const output = await simulateFreight.execute({
		from: "22060030",
		to: "88015600",
		orderProducts: [
			{ volume: 0.03, density: 100, quantity: 1 },
			{ volume: 0.125, density: 160, quantity: 1 },
			{ volume: 0.001, density: 1000, quantity: 3 },
		]
	});
	expect(output.total).toBe(201.22);
});