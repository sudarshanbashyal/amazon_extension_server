import { redis } from '..';

export const getCacheByKey = async (key: string) => {
	try {
		const cachedData = await redis.get(key);
		if (cachedData) return cachedData;
		return null;
	} catch (e) {
		return null;
	}
};

export const setCache = async (key: string, data: any) => {
	try {
		await redis.set(key, JSON.stringify(data), 'EX', 180);
	} catch (e) {
		return null;
	}
};

export const getKeysByPrefix = async (prefix: string): Promise<string[]> => {
	try {
		return await redis.keys(`${prefix}*`);
	} catch (e) {
		return [];
	}
};

export const deleteCacheByKeys = async (keys: string[]) => {
	try {
		await redis.del(keys);
	} catch (e) {
		return null;
	}
};
