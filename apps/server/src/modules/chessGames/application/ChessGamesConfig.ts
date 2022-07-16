import { getChessGamesRouter } from "../api/ChessGamesRouter";
import { MongoChessGamesRepository } from "../infrastructure/MongoChessGamesRepository";
import { ChessGamesFacade } from "./ChessGamesFacade";

export const getChessGamesConfig = () => {
	const chessGamesRepository = new MongoChessGamesRepository();
	const chessGamesFacade = new ChessGamesFacade(chessGamesRepository);
	const chessGamesRouter = getChessGamesRouter({ chessGamesFacade });

	return {
		chessGamesRouter,
	};
};
