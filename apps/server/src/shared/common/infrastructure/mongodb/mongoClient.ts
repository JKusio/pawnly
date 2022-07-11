import { MongoClient } from "mongodb";
import { mongodbConfig } from "../../../config/mongodb.config";

const MongoDBClient = () => {
	const client = new MongoClient(mongodbConfig.MONGODB_URL);

	return {
		connect: async () => {
			await client.connect();
			await client.db("admin").command({ ping: 1 });
		},
		close: async () => {
			await client.close();
		},
	};
};

export const mongoDBClient = MongoDBClient();
