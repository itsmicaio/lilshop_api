import Dimension from "./Dimension";
import Product from "./Product";
import ProductRepository from "./ProductRepository";

export default class ProductRepositoryMemory implements ProductRepository {
	products: Product[];

	constructor () {
		this.products = [
			new Product(1, "Guitarra", 1000, new Dimension(100, 30, 10, 3)),
			new Product(2, "Amplificador", 5000, new Dimension(50, 50, 50, 20)),
			new Product(3, "Cabo", 30, new Dimension(10, 10, 10, 1))
		];
	}

	async getProduct(idProduct: number): Promise<Product> {
		const product = this.products.find(product => product.productId === idProduct);
		if (!product) throw new Error("Product not found");
		return product;
	}
}