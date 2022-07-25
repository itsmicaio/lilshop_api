import Product from "./Product";
import ProductRepository from "./ProductRepository";
import pgp from "pg-promise";
import Dimension from "./Dimension";

export default class ProductRepositoryDatabase implements ProductRepository {

	async getProduct(idProduct: number): Promise<Product> {
		const connection = pgp()("postgres://lilshop_u:lilshop_p@localhost:5432/lilshop");
		const [productData] = await connection.query("select * from lilshop.product where id_product = $1", [idProduct]);
		const product = new Product(productData.id_product, productData.description, parseFloat(productData.price), new Dimension(productData.width, productData.height, productData.length, productData.weight));
		await connection.$pool.end();
		return product;
	}
}