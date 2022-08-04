import ShippingController from "./infra/controllers/ShippingController";
import ExpressAdapter from "./infra/http/ExpressAdapter";

const http = new ExpressAdapter();
const shippingController = new ShippingController(http);
http.listen(3002);