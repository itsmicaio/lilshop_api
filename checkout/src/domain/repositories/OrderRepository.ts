import Order from "../entities/Order";

export default interface OrderRepository {
	count(): Promise<number>
	save(order: Order): Promise<boolean>
	get(orderCode: string): Promise<Order>;
}