import ExpressAdapter from "./ExpressAdapter";
import OrderController from "./OrderController";
import PgPromiseAdapter from "./PgPromiseAdapter";

const http = new ExpressAdapter();
const connection = new PgPromiseAdapter();
new OrderController(http, connection);
http.listen(3000);