import { ChessGamesRepository } from "../infrastructure/ChessGamesRepository";

export class ChessGamesController {
	private readonly chessGamesRepository;

	constructor({
		chessGamesRepository,
	}: {
		chessGamesRepository: ChessGamesRepository;
	}) {
		this.chessGamesRepository = chessGamesRepository;
	}

	getChessGames = async () => {
		return this.chessGamesRepository.getChessGames();
	};
}
