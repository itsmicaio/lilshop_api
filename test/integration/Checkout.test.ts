import ProductRepositoryMemory from "../../src/infra/repositories/memory/ProductRepositoryMemory";
import Checkout from "../../src/application/Checkout";
import CouponRepositoryMemory from "../../src/infra/repositories/memory/CouponRepositoryMemory";
import OrderRepository from "../../src/domain/repositories/OrderRepository";
import CouponRepository from "../../src/domain/repositories/CouponRepository";
import ProductRepository from "../../src/domain/repositories/ProductRepository";
import OrderRepositoryMemory from "../../src/infra/repositories/memory/OrderRepositoryMemory";

let orderRepository: OrderRepository;
let couponRepository: CouponRepository;
let productRepository: ProductRepository;

beforeEach(function () { 
	productRepository = new ProductRepositoryMemory();
	couponRepository = new CouponRepositoryMemory();
	orderRepository = new OrderRepositoryMemory();
})

test("Deve criar um pedido", async function () {
	const checkout = new Checkout(productRepository, couponRepository, orderRepository);
	const output = await checkout.checkout({
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