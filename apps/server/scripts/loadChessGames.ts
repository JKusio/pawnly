import "dotenv/config";
import fs from "fs";
import path from "path";
import { mongoDBClient } from "../src/shared/common/infrastructure/mongodb/mongoDBClient";

(async () => {
	const [pgnFileLocation] = process.argv.slice(2);
	const pgnFilePath = path.join(__dirname, pgnFileLocation);
	console.log(`Trying to read pgn file from ${pgnFilePath}`);

	const pgnFile = fs.readFileSync(pgnFilePath);
	const lines = pgnFile.toString().split("\n");

	const gamePGNs: string[] = [];
	let storedLines: string[] = [];
	let emptyLinesCount = 0;

	for (const line of lines) {
		if (line === "") {
			emptyLinesCount++;

			if (emptyLinesCount == 2) {
				gamePGNs.push(storedLines.join("\n"));
				emptyLinesCount = 0;
				storedLines = [];
				continue;
			}
		}

		storedLines.push(line);
	}

	console.log(`Read ${gamePGNs.length} games`);

	console.log("Connection to mongoDB");
	await mongoDBClient.connect();
	const db = mongoDBClient.getDatabase();

	console.log("Uploading games to mongoDB");
	const chessGames = db.collection("chessgames");
	await chessGames.insertMany(gamePGNs.map((gamePGN) => ({ pgn: gamePGN })));

	console.log(`Managed to upload ${gamePGNs.length} new games to database`);
	return;
})();
