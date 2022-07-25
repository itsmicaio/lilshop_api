import Dimension from "../../../domain/entities/Dimension";
import Order from "../../../domain/entities/Order";
import OrderRepository from "../../../domain/repositories/OrderRepository";
import Product from "../../../domain/entities/Product";

export default class OrderRepositoryMemory implements OrderRepository {
	orders: Order[];

	constructor() {
		const order = new Order("143.402.457-12", new Date("2020-01-01T00:00:00"), "202000000001")
		order.addProduct(new Product(1, "Echo Dot", 100.00), 1)
		this.orders = [
			order
		];
	}

	async saveOrder(order: Order): Promise<boolean> {
		this.orders.push(order)
		return true
	}

	async getOrder(orderCode: string): Promise<Order> {
		const order = this.orders.find(order => order.code === orderCode);
		if (!order) throw new Error("Order not found");
		return order;
	}

	async count(): Promise<number> {
		return this.orders.length
	}
}