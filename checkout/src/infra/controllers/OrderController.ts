import Http from "../http/Http";
import CouponRepositoryMemory from "../repositories/memory/CouponRepositoryMemory";
import OrderRepositoryMemory from "../repositories/memory/OrderRepositoryMemory";
import ProductRepositoryDatabase from "../repositories/database/ProductRepositoryDatabase";
import Connection from "../database/Connection";
import PreviewOrder from "../../application/PreviewOrder";

export default class OrderController {

	constructor (readonly http: Http, readonly connection: Connection) {
		http.on("post", "/orderPreview", function (params: any, body: any) {
			const productRepository = new ProductRepositoryDatabase(connection);
			const couponRepository = new CouponRepositoryMemory();
			const service = new PreviewOrder(productRepository, couponRepository);
			const output = service.execute(body);
			return output;
		});
	}
}