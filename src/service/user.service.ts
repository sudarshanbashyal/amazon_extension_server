import { ApolloError } from 'apollo-server-core';
import { UserModel } from '../schema/user.schema';
import { CreateUserDTO, LoginUserDTO } from '../types/user.type';
import { generateAccessToken, hashPassword, isPasswordCorrect } from '../utils/auth';

export class UserService {
	async createUser(createUserDto: CreateUserDTO) {
		try {
			const hash = hashPassword(createUserDto.password);

			return await UserModel.create({
				...createUserDto,
				password_hash: hash,
			});
		} catch (error) {
			throw error;
		}
	}

	async loginUser(loginDto: LoginUserDTO) {
		try {
			const { email, password } = loginDto;
			const user = await UserModel.findOne({
				email: email,
			});
			if (!user) throw new ApolloError('Incorrect email or password.');

			const isPWCorrect = isPasswordCorrect(password, user.password_hash);
			if (!isPWCorrect || !user) throw new ApolloError('Incorrect email or password');

			return generateAccessToken({
				_id: user._id,
				email: user.email,
				name: user.name,
			});
		} catch (error) {
			throw error;
		}
	}
}
