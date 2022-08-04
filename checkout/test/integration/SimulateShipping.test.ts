import SimulateShipping from "../../src/application/SimulateShipping";
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter";
import AxiosGateway from "../../src/infra/gateway/AxiosGateway";
import CalculateShippingHttGateway from "../../src/infra/gateway/CalculateShippingHttpGateway";
import ProductRepositoryDatabase from "../../src/infra/repositories/database/ProductRepositoryDatabase";

test.skip("Deve simular o frete", async function () {
	const connection = new PgPromiseAdapter();
	const productRepository = new ProductRepositoryDatabase(connection);

	const shippingGateway = new AxiosGateway("http://localhost:3002")
	const calculateShippingGateway = new CalculateShippingHttGateway(shippingGateway)

	const simulateShipping = new SimulateShipping(productRepository, calculateShippingGateway);
	const output = await simulateShipping.execute({
		orderProducts: [
			{ idProduct: 1, quantity: 1 },
			{ idProduct: 2, quantity: 1 },
			{ idProduct: 3, quantity: 3 }
		]
	});
	expect(output.total).toBe(260);
	await connection.close();
});