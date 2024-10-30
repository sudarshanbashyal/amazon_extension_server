import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateUserDTO {
	@Field(() => String)
	@IsNotEmpty()
	name: string;

	@Field(() => String)
	@IsEmail()
	email: string;

	@Field(() => String)
	@MinLength(6, {
		message: 'Password must be at least 6 characters in length.',
	})
	password: string;
}

@InputType()
export class LoginUserDTO {
	@Field(() => String)
	email: string;

	@Field(() => String)
	password: string;
}
