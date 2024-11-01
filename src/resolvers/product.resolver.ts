import { Arg, Authorized, Ctx, Query, Mutation, Resolver } from 'type-graphql';
import { Product } from '../schema/product.schema';
import { ProductService } from '../service/product.service';
import { Context } from '../types/context.type';
import { ProductDTO, ProductResultDTO } from '../types/product.dto';
import { PaginationInput } from '../utils/pagination';

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
	@Query(() => ProductResultDTO)
	async getProductsByUser(@Arg('pagination') pagination: PaginationInput, @Ctx() ctx: Context) {
		try {
			return await this.productService.getProducts(pagination, ctx);
		} catch (error) {
			throw error;
		}
	}
}
