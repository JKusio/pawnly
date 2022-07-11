import * as trpc from "@trpc/server";
import { ChessGamesController } from "./ChessGamesController";

export const getChessGamesRouter = ({
	chessGamesController,
}: {
	chessGamesController: ChessGamesController;
}) => {
	const chessGamesRouter = trpc.router().query("getChessGames", {
		resolve: async () => {
			return chessGamesController.getChessGames();
		},
	});

	return chessGamesRouter;
};

export type ChessGamesRouter = ReturnType<typeof getChessGamesRouter>;
