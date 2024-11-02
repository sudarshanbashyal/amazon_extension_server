import dotenv from 'dotenv';
import 'reflect-metadata';
import express from 'express';
import { buildSchema } from 'type-graphql';
import cookieParser from 'cookie-parser';
import { ApolloServer } from 'apollo-server-express';
import {
	ApolloServerPluginLandingPageGraphQLPlayground,
	ApolloServerPluginLandingPageProductionDefault,
} from 'apollo-server-core';
import { resolvers } from './resolvers';
import { initializeDatabase } from './utils/mongo';
import { checkAuth, verifyJWT } from './utils/auth';
import { Context } from './types/context.type';
import Redis from 'ioredis';

dotenv.config();

export let redis: Redis | null = null;

const connectToRedis = () => {
	try {
		redis = new Redis(process.env.REDIS_URI || '');
		redis.on('connect', () => {
			console.error('Connected to Redis!');
		});
		redis.on('error', (error: any) => {
			console.error('Redis Error: ', error);
			if (error?.code === 'ECONNREFUSED') {
				process.exit(1);
			}
		});
	} catch (e) {
		process.exit(1);
	}
};

const bootstrap = async () => {
	// build schema
	const schema = await buildSchema({
		resolvers: resolvers,
		authChecker: checkAuth,
		validate: true,
	});

	const app = express() as any;
	app.use(cookieParser());

	// create apollo server
	const server = new ApolloServer({
		schema,
		context: (ctx: Context) => {
			if (ctx.req.headers.access_token) {
				const user = verifyJWT(ctx.req.headers.access_token as string);
				ctx.user = user;
				return ctx;
			}
			return ctx;
		},
		plugins: [
			process.env.NODE_ENV === 'production'
				? ApolloServerPluginLandingPageProductionDefault()
				: ApolloServerPluginLandingPageGraphQLPlayground(),
		],
	});
	await server.start();
	server.applyMiddleware({ app });

	// connect to databases
	initializeDatabase();
	connectToRedis();
	app.listen(process.env.PORT || 4000, () => {
		console.log('Server is up!');
	});
};
bootstrap();
