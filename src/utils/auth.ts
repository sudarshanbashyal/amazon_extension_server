import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { AuthChecker } from 'type-graphql';
import { User } from '../schema/user.schema';
import { Context } from '../types/context.type';
dotenv.config();

const SALT_ROUNDS = 10;

export interface JWTPayload {
	_id: string;
	email: string;
	name: string;
}

export const hashPassword = (password: string): string => {
	const salt = bcrypt.genSaltSync(SALT_ROUNDS);
	const hash = bcrypt.hashSync(password, salt);

	return hash;
};

export const isPasswordCorrect = (password: string, hash: string): boolean => {
	return bcrypt.compareSync(password, hash);
};

export const generateAccessToken = (payload: JWTPayload): string => {
	return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '7d' });
};

export const verifyJWT = (token: string): User | null => {
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET!);
		console.log('decoded: ', decoded);
		return decoded as User;
	} catch (error) {
		return null;
	}
};

export const checkAuth: AuthChecker<Context> = ({ context }) => {
	return !!context.user;
};
