import "dotenv/config";
import { Chess } from "chess.js";
import { mongoDBClient } from "../src/shared/common/infrastructure/mongodb/mongoDBClient";

const calculateRating = (pieces: number, moves: number) => {
	return 100 + (pieces - 2) * 50 + (moves > 40 ? 40 : moves) * 50;
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
		fen: string;
		moves: { from: string; to: string; san: string }[];
		rating: number;
	}[] = [];

	for (const game of games) {
		chess.loadPgn(game.pgn);
		const gameLength = chess.history().length;
		let undoneMoves: { from: string; to: string; san: string }[] = [];

		for (let i = 0; i <= gameLength; i++) {
			for (let j = 0; j < undoneMoves.length + 1; j++) {
				const pieces = chess
					.board()
					.map((row) =>
						row.reduce((prev, square) => (square !== null ? prev + 1 : prev), 0)
					)
					.reduce((prev, current) => prev + current, 0);

				const rating = calculateRating(pieces, j);
				puzzles.push({
					fen: chess.fen(),
					moves: undoneMoves.slice(0, j),
					rating,
				});
			}

			const undoneMove = chess.undo();
			undoneMoves.push({
				from: undoneMove?.from as string,
				to: undoneMove?.to as string,
				san: undoneMove?.san as string,
			});
		}

		puzzles = puzzles.sort(() => 0.5 - Math.random()).slice(0, 200);

		console.log(`Uploading ${puzzles.length} puzzles...`);
		await chessVisualizationPuzzles.insertMany(puzzles);
		console.log(`Uploaded ${puzzles.length} puzzles!`);
		puzzles = [];
	}
})();
