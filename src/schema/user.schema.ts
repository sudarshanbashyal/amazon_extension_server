import { getModelForClass, index, prop } from '@typegoose/typegoose';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
@index({ email: 1 })
export class User {
	@Field(() => String)
	_id: string;

	@Field(() => String)
	@prop({ required: true })
	name: string;

	@Field(() => String)
	@prop({ required: true })
	email: string;

	@prop({ required: true })
	password_hash: string;
}

export const UserModel = getModelForClass(User);
