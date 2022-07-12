import { mongoDBClient } from "../../../shared/common/infrastructure/mongodb/mongoDBClient";
import { GetChessGamesQueryInput } from "../api/GetChessGamesQueryInput";
import { ChessGame } from "../domain/ChessGame";
import { ChessGamesRepository } from "./ChessGamesRepository";

export class MongoChessGamesRepository implements ChessGamesRepository {
	private chessGamesCollection;

	constructor() {
		this.chessGamesCollection = mongoDBClient
			.getDatabase()
			.collection<ChessGame>("chessgames");
	}

	getChessGames = async ({
		piecesLeft,
		count,
		random,
	}: GetChessGamesQueryInput): Promise<ChessGame[]> => {
		console.log("");

		let chessGames = [];

		const skip = random
			? Math.floor(
					Math.random() *
						((await this.chessGamesCollection.countDocuments({
							piecesLeft: { $lte: piecesLeft },
						})) -
							count)
			  )
			: 0;

		chessGames = await this.chessGamesCollection
			.find({
				piecesLeft: { $lte: piecesLeft },
			})
			.skip(skip)
			.limit(count)
			.toArray();

		return chessGames;
	};
}
