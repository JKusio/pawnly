import "dotenv/config";
import { Chess } from "chess.js";
import { mongoDBClient } from "../src/shared/common/infrastructure/mongodb/mongoDBClient";
import { ObjectId } from "mongodb";

const calculateRating = (pieces: number, moves: number) => {
	return pieces * 50 + moves * 70;
};

(async () => {
	await mongoDBClient.connect();
	const db = mongoDBClient.getDatabase();
	const chessGames = db.collection("chessgames");
	const chessVisualizationPuzzles = db.collection("chessvisualizationpuzzles");

	const chess = new Chess();

	const games = await chessGames.find().toArray();

	console.log(`Loaded ${games.length} games`);

	let puzzles: {
		chessGameId: ObjectId;
		startMove: number;
		movesForward: number;
		rating: number;
	}[] = [];

	for (const game of games) {
		chess.loadPgn(game.pgn);
		const gameLength = chess.history().length;
		let depth = 0;

		for (let i = 0; i <= gameLength; i++) {
			for (let j = 0; j < depth + 1; j++) {
				const pieces = chess
					.board()
					.map((row) =>
						row.reduce((prev, square) => (square !== null ? prev + 1 : prev), 0)
					)
					.reduce((prev, current) => prev + current, 0);

				const rating = calculateRating(pieces, j);
				puzzles.push({
					chessGameId: game._id,
					startMove: gameLength - i,
					movesForward: j,
					rating,
				});
			}

			depth = depth + 1 > 20 ? 20 : depth + 1;
			chess.undo();
		}

		console.log(`Uploading ${puzzles.length} puzzles...`);
		await chessVisualizationPuzzles.insertMany(puzzles);
		console.log(`Uploaded ${puzzles.length} puzzles!`);
		puzzles = [];
	}
})();
