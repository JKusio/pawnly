import { ChessGame } from "../domain/ChessGame";

export interface ChessGamesRepository {
	getChessGames(): Promise<ChessGame[]>;
}
