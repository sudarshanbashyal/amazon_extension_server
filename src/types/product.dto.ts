import { IsNotEmpty } from 'class-validator';
import { Field, InputType, ObjectType } from 'type-graphql';
import { Product } from '../schema/product.schema';
import { PaginationOutput } from '../utils/pagination';

@InputType()
@ObjectType('ProductObjectDTO')
export class ProductDTO {
	@Field(() => String, { defaultValue: '' })
	@IsNotEmpty()
	product_title: string;

	@Field(() => String)
	product_url: string;

	@Field(() => String, { nullable: true, defaultValue: '' })
	product_description: string;

	@Field(() => String, { nullable: true, defaultValue: '' })
	product_price: string;

	@Field(() => [String], { nullable: true, defaultValue: [] })
	product_image_urls: string[];

	@Field(() => Number, { nullable: true })
	product_rating: number;
}

@ObjectType()
export class ProductResultDTO {
	@Field(() => PaginationOutput)
	pagination: PaginationOutput;

	@Field(() => [Product])
	products: Product[];
}
