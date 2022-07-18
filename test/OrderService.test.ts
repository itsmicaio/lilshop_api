import ProductRepositoryMemory from "../src/ProductRepositoryMemory";
import OrderService from "../src/OrderService";
import CouponRepositoryMemory from "../src/CouponRepositoryMemory";
import OrderRepository from "../src/OrderRepository";
import CouponRepository from "../src/CouponRepository";
import ProductRepository from "../src/ProductRepository";
import OrderRepositoryMemory from "../src/OrderRepositoryMemory";

let orderRepository: OrderRepository;
let couponRepository: CouponRepository;
let productRepository: ProductRepository;

beforeEach(function () { 
	productRepository = new ProductRepositoryMemory();
	couponRepository = new CouponRepositoryMemory();
	orderRepository = new OrderRepositoryMemory();
})

test("Deve simular um pedido", async function () {

	const orderService = new OrderService(productRepository, couponRepository, orderRepository);
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

test("Deve criar um pedido", async function () {
	const orderService = new OrderService(productRepository, couponRepository, orderRepository);
	const output = await orderService.checkout({
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