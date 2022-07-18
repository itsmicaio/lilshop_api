import Http from "./Http";
import ProductRepositoryMemory from "./ProductRepositoryMemory";
import OrderService from "./OrderService";

export default class OrderController {

	constructor (readonly http: Http) {
		http.on("post", "/orderPreview", function (params: any, body: any) {
			const productRepository = new ProductRepositoryMemory();
			const service = new OrderService(productRepository);
			const output = service.preview(body);
			return output;
		});
	}
}