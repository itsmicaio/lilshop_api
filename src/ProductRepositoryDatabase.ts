import Product from "./Product";
import ProductRepository from "./ProductRepository";
import pgp from "pg-promise";
import Dimension from "./Dimension";
import Connection from "./Connection";

export default class ProductRepositoryDatabase implements ProductRepository {
  constructor(readonly connection: Connection) {
  }

	async getProduct(idProduct: number): Promise<Product> {
		const [productData] = await this.connection.query("select * from lilshop.product where id_product = $1", [idProduct]);
		const product = new Product(productData.id_product, productData.description, parseFloat(productData.price), new Dimension(productData.width, productData.height, productData.length, productData.weight));
    return product;
	}
}