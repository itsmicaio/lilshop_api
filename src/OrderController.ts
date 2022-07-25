import Http from "./Http";
import OrderService from "./OrderService";
import CouponRepositoryMemory from "./CouponRepositoryMemory";
import OrderRepositoryMemory from "./OrderRepositoryMemory";
import ProductRepositoryDatabase from "./ProductRepositoryDatabase";
import Connection from "./Connection";

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