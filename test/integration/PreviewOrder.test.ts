import PreviewOrder from "../../src/application/PreviewOrder";
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter";
import CouponRepositoryMemory from "../../src/infra/repositories/memory/CouponRepositoryMemory";
import ProductRepositoryDatabase from "../../src/infra/repositories/database/ProductRepositoryDatabase";

test("Deve simular um pedido", async function () {
	const connection = new PgPromiseAdapter();
	const productRepository = new ProductRepositoryDatabase(connection);
	const couponRepository = new CouponRepositoryMemory();
	const previewOrder = new PreviewOrder(productRepository, couponRepository);
	const output = await previewOrder.execute({
		cpf: "886.634.854-68",
		orderProducts: [
			{ idProduct: 1, quantity: 1 },
			{ idProduct: 2, quantity: 1 },
			{ idProduct: 3, quantity: 3 }
		]
	});
	expect(output.total).toBe(6350);
	expect(output.shipping).toBe(260);
	expect(output.discount).toBe(0);
	await connection.close()
});