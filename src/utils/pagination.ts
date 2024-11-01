import { Field, InputType, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class PaginationOutput {
	@Field(() => Int)
	total: number;

	@Field(() => Int)
	page: number;

	@Field(() => Int)
	limit: number;

	@Field(() => Int)
	totalPages: number;
}

@InputType()
export class PaginationInput {
	@Field(() => Int)
	page: number;

	@Field(() => Int)
	limit: number;
}
