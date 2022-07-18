import Order from "./Order";

export default interface OrderRepository {
	count(): Promise<number>
	saveOrder(order: Order): Promise<boolean>
	getOrder (orderCode: string): Promise<Order>;
}