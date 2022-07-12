import { GetChessGamesQueryInput } from "../api/GetChessGamesQueryInput";
import { ChessGame } from "../domain/ChessGame";

export interface ChessGamesRepository {
	getChessGames(input: GetChessGamesQueryInput): Promise<ChessGame[]>;
}
