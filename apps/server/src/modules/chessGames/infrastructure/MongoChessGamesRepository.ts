import { mongoDBClient } from "../../../shared/common/infrastructure/mongodb/mongoDBClient";
import { ChessGame } from "../domain/ChessGame";
import { ChessGamesRepository } from "./ChessGamesRepository";

export class MongoChessGamesRepository implements ChessGamesRepository {
	private chessGamesCollection;

	constructor() {
		this.chessGamesCollection = mongoDBClient
			.getDatabase()
			.collection<ChessGame>("chessgames");
	}

	getChessGames = async (): Promise<ChessGame[]> => {
		const chessGames = await this.chessGamesCollection.find();
		return chessGames.toArray();
	};
}
