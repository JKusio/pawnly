import { mongoDBClient } from "../../../shared/common/infrastructure/mongodb/mongoDBClient";
import { ChessVisualizationPuzzle } from "./ChessVisualizationPuzzle";
import { ChessVisualizationPuzzlesRepository } from "./ChessVisualizationPuzzlesRepository";

export class MongoChessVisualizationPuzzleRepository
	implements ChessVisualizationPuzzlesRepository
{
	private chessVisualizationPuzzlesCollection;

	constructor() {
		this.chessVisualizationPuzzlesCollection = mongoDBClient
			.getDatabase()
			.collection<ChessVisualizationPuzzle>("chessgames");
	}

	async findOne(): Promise<ChessVisualizationPuzzle | null> {
		return this.chessVisualizationPuzzlesCollection.findOne();
	}
}
