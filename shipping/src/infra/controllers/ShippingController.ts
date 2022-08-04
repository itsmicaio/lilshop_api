import SimulateShipping from "../../application/SimulateShipping";
import Http from "../http/Http";

export default class ShippingController {

	constructor (readonly http: Http) {
		http.on("post", "/calculateShipping", function (params: any, body: any) {
			const service = new SimulateShipping();
			const output = service.execute(body);
			return output;
		});
	}
}