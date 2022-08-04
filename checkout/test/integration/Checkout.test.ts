import Checkout from "../../src/application/Checkout";
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter";
import ProductRepositoryDatabase from "../../src/infra/repositories/database/ProductRepositoryDatabase";
import OrderRepositoryDatabase from "../../src/infra/repositories/database/OrderRepositoryDatabase";
import CouponRepositoryDatabase from "../../src/infra/repositories/database/CouponRepositoryDatabase";


test("Deve criar um pedido", async function () {
	const connection = new PgPromiseAdapter();
  const productRepository = new ProductRepositoryDatabase(connection);
	const couponRepository = new CouponRepositoryDatabase(connection);
	const orderRepository = new OrderRepositoryDatabase(connection);
	await orderRepository.clean();
	const checkout = new Checkout(productRepository, couponRepository, orderRepository);
	const output = await checkout.execute({
		cpf: "886.634.854-68",
		orderProducts: [
			{ idProduct: 1, quantity: 1 },
			{ idProduct: 2, quantity: 1 },
			{ idProduct: 3, quantity: 3 }
		],
		date: new Date("2020-01-01T00:00:00")
	});
	expect(output.code).toBe("202000000001");
	const count = await orderRepository.count()
	expect(count).toBe(1);
	await connection.close();
})