import ExpressAdapter from "./ExpressAdapter";
import OrderController from "./OrderController";

const http = new ExpressAdapter();
new OrderController(http);
http.listen(3000);