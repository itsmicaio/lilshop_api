import SimulateShipping from "../../src/application/SimulateShipping";

test("Deve simular o frete", async function () {
	const simulateFreight = new SimulateShipping();
	const output = await simulateFreight.execute({
		orderProducts: [
			{ volume: 0.03, density: 100, quantity: 1 },
			{ volume: 0.125, density: 160, quantity: 1 },
			{ volume: 0.001, density: 1000, quantity: 3 },
		]
	});
	expect(output.total).toBe(260);
});