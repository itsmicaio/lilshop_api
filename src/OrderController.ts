import Http from "./Http";
import OrderService from "./OrderService";
import CouponRepositoryMemory from "./CouponRepositoryMemory";
import OrderRepositoryMemory from "./OrderRepositoryMemory";
import ProductRepositoryDatabase from "./ProductRepositoryDatabase";

export default class OrderController {

	constructor (readonly http: Http) {
		http.on("post", "/orderPreview", function (params: any, body: any) {
			const productRepository = new ProductRepositoryDatabase();
			const couponRepository = new CouponRepositoryMemory();
			const orderRepository = new OrderRepositoryMemory();
			const service = new OrderService(productRepository, couponRepository, orderRepository);
			const output = service.preview(body);
			return output;
		});
	}
}