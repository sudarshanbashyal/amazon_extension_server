import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { User } from '../schema/user.schema';
import { UserService } from '../service/user.service';
import { Context } from '../types/context.type';
import { CreateUserDTO, LoginUserDTO } from '../types/user.type';

@Resolver()
export class UserResolver {
	constructor(private readonly userService: UserService) {
		this.userService = new UserService();
	}

	@Query(() => String)
	ping() {
		return 'pong';
	}

	@Query(() => User)
	me(@Ctx() ctx: Context) {
		return ctx.user;
	}

	@Mutation(() => User)
	async createUser(@Arg('input') dto: CreateUserDTO) {
		try {
			return await this.userService.createUser(dto);
		} catch (error) {
			throw error;
		}
	}

	@Query(() => String)
	async login(@Arg('input') loginDto: LoginUserDTO, @Ctx() ctx: Context) {
		try {
			return await this.userService.loginUser(loginDto, ctx);
		} catch (error) {
			throw error;
		}
	}
}
