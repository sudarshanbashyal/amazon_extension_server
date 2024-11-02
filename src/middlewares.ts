import { MiddlewareFn } from 'type-graphql';
import { Context } from './types/context.type';
import { getCacheByKey } from './utils/redis';

export const productCacheMiddleware: MiddlewareFn<Context> = async ({ context, args }, next) => {
	try {
		if (!context.user) return next();
		const { pagination } = args;
		const cacheKey = `product_${context.user?._id}_${pagination.page}_${pagination.limit}`;
		const cachedData = await getCacheByKey(cacheKey);
		if (!cachedData) return next();

		return JSON.parse(cachedData);
	} catch (e) {
		return next();
	}
};
