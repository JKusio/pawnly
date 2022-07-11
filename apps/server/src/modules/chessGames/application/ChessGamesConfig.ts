import { ChessGamesController } from "../api/ChessGamesController";
import { getChessGamesRouter } from "../api/ChessGamesRouter";
import { MongoChessGamesRepository } from "../infrastructure/MongoChessGamesRepository";

export const getChessGamesConfig = () => {
	const chessGamesRepository = new MongoChessGamesRepository();
	const chessGamesController = new ChessGamesController({
		chessGamesRepository,
	});
	const chessGamesRouter = getChessGamesRouter({ chessGamesController });

	return {
		chessGamesRouter,
	};
};
