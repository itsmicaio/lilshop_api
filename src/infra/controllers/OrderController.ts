import Http from "../http/Http";
import OrderService from "../../application/PreviewOrder";
import CouponRepositoryMemory from "../repositories/memory/CouponRepositoryMemory";
import OrderRepositoryMemory from "../repositories/memory/OrderRepositoryMemory";
import ProductRepositoryDatabase from "../repositories/database/ProductRepositoryDatabase";
import Connection from "../database/Connection";

export default class OrderController {

	constructor (readonly http: Http, readonly connection: Connection) {
		http.on("post", "/orderPreview", function (params: any, body: any) {
			const productRepository = new ProductRepositoryDatabase(connection);
			const couponRepository = new CouponRepositoryMemory();
			const orderRepository = new OrderRepositoryMemory();
			const service = new OrderService(productRepository, couponRepository, orderRepository);
			const output = service.preview(body);
			return output;
		});
	}
}