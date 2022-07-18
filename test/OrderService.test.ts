import ProductRepositoryMemory from "../src/ProductRepositoryMemory";
import OrderService from "../src/OrderService";
import CouponRepositoryMemory from "../src/CouponRepositoryMemory";

test("Deve simular um pedido", async function () {
	const itemRepository = new ProductRepositoryMemory();
	const couponRepository = new CouponRepositoryMemory();
	const orderService = new OrderService(itemRepository, couponRepository);
	const output = await orderService.preview({
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
});

test.skip("Deve validar um cupom vencido", async function () {
	const itemRepository = new ProductRepositoryMemory();
	const couponRepository = new CouponRepositoryMemory();
	const orderService = new OrderService(itemRepository, couponRepository);
	const order = orderService.preview({
		cpf: "886.634.854-68",
		couponCode: "VALE20",
		orderProducts: [
			{ idProduct: 1, quantity: 1 },
			{ idProduct: 2, quantity: 1 },
			{ idProduct: 3, quantity: 3 }
		]
	})
	expect(order).toBe("")
});