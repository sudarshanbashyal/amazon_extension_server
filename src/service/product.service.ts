import { ProductModel } from '../schema/product.schema';
import { User } from '../schema/user.schema';
import { ProductDTO } from '../types/product.dto';

export class ProductService {
	async createProduct(input: ProductDTO & { user: User['_id'] }) {
		try {
			return await ProductModel.create(input);
		} catch (error) {
			throw error;
		}
	}
}
