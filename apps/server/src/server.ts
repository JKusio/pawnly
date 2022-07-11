import "dotenv/config";
import { createApp } from "./interfaces/app";

(async (): Promise<void> => {
	const app = await createApp();

	app.listen(3000, () => {
		console.log(`Server listening on port ${3000}`);
	});
})();
