import Order from "../../../domain/entities/Order";
import OrderRepository from "../../../domain/repositories/OrderRepository";
import Connection from "../../database/Connection";

export default class OrderRepositoryDatabase implements OrderRepository {

	constructor (readonly connection: Connection) {
	}

  async save(order: Order): Promise<boolean> {
    const [orderData] = await this.connection.query("insert into lilshop.order (code, cpf, issue_date, total, freight) values ($1, $2, $3, $4, $5) returning *", [order.getCode(), order.cpf.value, order.date, order.getTotal(), order.shipping]);
		for (const orderProduct of order.products) {
			await this.connection.query("insert into lilshop.order_product (id_order, id_product, price, quantity) values ($1, $2, $3, $4)", [orderData.id_order, orderProduct.productId, orderProduct.price, orderProduct.quantity]);
    }
    return true
	}

	async count(): Promise<number> {
		const [row] = await this.connection.query("select count(*)::int from lilshop.order", []);
		return row.count;
  }
  
  async get(orderCode: string): Promise<Order> {
    throw new Error("Method not implemented.");
  }

	async clean(): Promise<void> {
		await this.connection.query("delete from lilshop.order_product", []);
		await this.connection.query("delete from lilshop.order", []);
	}
}