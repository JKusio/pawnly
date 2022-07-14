import { GetChessGamesQueryInput } from "../api/GetChessGamesQueryInput";
import { ChessGamesRepository } from "../infrastructure/ChessGamesRepository";

export class ChessVisualizationPuzzlesFacade {
	constructor(protected readonly chessGamesRepository: ChessGamesRepository) {}

	getChessGames = async (input: GetChessGamesQueryInput) => {
		return this.chessGamesRepository.getChessGames(input);
	};
}
