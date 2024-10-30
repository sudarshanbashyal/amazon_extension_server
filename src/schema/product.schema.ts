import { getModelForClass, index, prop, Ref } from '@typegoose/typegoose';
import { Field, ObjectType } from 'type-graphql';
import { User } from './user.schema';

@ObjectType()
@index({ product_url: 1 })
export class Product {
	@Field(() => String)
	_id: string;

	@Field(() => String)
	@prop({ required: true })
	product_title: string;

	@Field(() => String)
	@prop()
	product_description: string;

	@Field(() => String)
	@prop()
	product_price: string;

	@Field(() => [String])
	@prop({ default: [] })
	product_image_urls: string[];

	@Field(() => Number)
	@prop()
	product_rating: number;

	@Field(() => String)
	@prop({ required: true })
	product_url: string;

	@Field(() => String)
	@prop({ required: true, ref: () => User })
	user: Ref<User>;
}

export const ProductModel = getModelForClass(Product);
