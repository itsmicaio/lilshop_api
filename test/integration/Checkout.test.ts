import Checkout from "../../src/application/Checkout";
import ProductRepositoryMemory from "../../src/infra/repositories/memory/ProductRepositoryMemory";
import CouponRepositoryMemory from "../../src/infra/repositories/memory/CouponRepositoryMemory";
import OrderRepositoryMemory from "../../src/infra/repositories/memory/OrderRepositoryMemory";


test("Deve criar um pedido", async function () {
  const productRepository = new ProductRepositoryMemory();
	const couponRepository = new CouponRepositoryMemory();
	const orderRepository = new OrderRepositoryMemory();
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
	expect(output.code).toBe("202000000002");
	const count = await orderRepository.count()
	expect(count).toBe(2);
})