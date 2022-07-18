import ProductRepositoryMemory from "../src/ProductRepositoryMemory";
import OrderService from "../src/OrderService";

test("Deve simular um pedido", async function () {
	const itemRepository = new ProductRepositoryMemory();
	const orderService = new OrderService(itemRepository);
	const output = await orderService.preview({
		cpf: "886.634.854-68",
		orderProducts: [
			{ idProduct: 1, quantity: 1 },
			{ idProduct: 2, quantity: 1 },
			{ idProduct: 3, quantity: 3 }
		]
	});
	expect(output.total).toBe(6350);
});