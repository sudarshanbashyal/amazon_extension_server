import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const initializeDatabase = async () => {
	try {
		await mongoose.connect(process.env.DB_URI || '');
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};
