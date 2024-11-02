import { ProductModel } from '../schema/product.schema';
import { User } from '../schema/user.schema';
import { Context } from '../types/context.type';
import { ProductDTO } from '../types/product.dto';
import { PaginationInput } from '../utils/pagination';
import { deleteCacheByKeys, getKeysByPrefix, setCache } from '../utils/redis';

export class ProductService {
	async createProduct(input: ProductDTO & { user: User['_id'] }) {
		try {
			const keys = await getKeysByPrefix(`product_${input.user}`);
			await deleteCacheByKeys(keys);

			return await ProductModel.create(input);
		} catch (error) {
			throw error;
		}
	}

	async getProducts(pagination: PaginationInput, ctx: Context) {
		try {
			const { page, limit } = pagination;
			const total = await ProductModel.countDocuments({
				user: ctx.user,
			});

			const skip = (page - 1) * limit;

			const result = await ProductModel.find({
				user: ctx.user,
			})
				.limit(limit)
				.skip(skip)
				.sort({
					_id: -1,
				});

			const data = {
				pagination: {
					total,
					page,
					limit,
					totalPages: Math.ceil(total / limit),
				},
				products: result,
			};

			const cacheKey = `product_${ctx.user?._id}_${page}_${limit}`;
			setCache(cacheKey, data);

			return data;
		} catch (error) {
			throw error;
		}
	}
}
