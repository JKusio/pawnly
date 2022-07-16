import "dotenv/config";
import { createApp } from "./interfaces/app";
import { mongoDBClient } from "./shared/common/infrastructure/mongodb/mongoDBClient";

(async (): Promise<void> => {
	await mongoDBClient.connect();
	const app = await createApp();

	app.listen(3000, () => {
		console.log(`Server listening on port ${3000}`);
	});
})();
