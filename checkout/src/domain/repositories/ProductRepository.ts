import Product from "../entities/Product";

export default interface ProductRepository {
	getProduct (idProduct: number): Promise<Product>;
}