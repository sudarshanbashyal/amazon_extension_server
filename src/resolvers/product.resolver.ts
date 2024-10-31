import { Arg, Authorized, Ctx, Query, Mutation, Resolver } from 'type-graphql';
import { Product } from '../schema/product.schema';
import { ProductService } from '../service/product.service';
import { Context } from '../types/context.type';
import { ProductDTO } from '../types/product.dto';

@Resolver()
export class ProductResolver {
	constructor(private readonly productService: ProductService) {
		this.productService = new ProductService();
	}

	@Authorized()
	@Mutation(() => Product)
	async saveProduct(@Arg('input') dto: ProductDTO, @Ctx() ctx: Context) {
		try {
			return await this.productService.createProduct({
				...dto,
				user: ctx.user?._id || '',
			});
		} catch (error) {
			throw error;
		}
	}

	@Authorized()
	@Query(() => [Product])
	async getProductsByUser(@Ctx() ctx: Context) {
		try {
			return await this.productService.getProducts(ctx);
		} catch (error) {
			throw error;
		}
	}
}
