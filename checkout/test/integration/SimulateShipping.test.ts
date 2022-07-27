import SimulateShipping from "../../src/application/SimulateShipping";
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter";
import ProductRepositoryDatabase from "../../src/infra/repositories/database/ProductRepositoryDatabase";

test("Deve simular o frete", async function () {
	const connection = new PgPromiseAdapter();
	const itemRepository = new ProductRepositoryDatabase(connection);
	const simulateFreight = new SimulateShipping(itemRepository);
	const output = await simulateFreight.execute({
		orderProducts: [
			{ idProduct: 1, quantity: 1 },
			{ idProduct: 2, quantity: 1 },
			{ idProduct: 3, quantity: 3 }
		]
	});
	expect(output.total).toBe(260);
	await connection.close();
});