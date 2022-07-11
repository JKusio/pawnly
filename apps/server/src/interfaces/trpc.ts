import * as trpc from "@trpc/server";
import { ChessGamesRouter } from "../modules/chessGames/api/ChessGamesRouter";

export const getAppRouter = ({
	chessGamesRouter,
}: {
	chessGamesRouter: ChessGamesRouter;
}) => {
	const appRouter = trpc.router().merge(chessGamesRouter);

	return appRouter;
};

export type AppRouter = ReturnType<typeof getAppRouter>;
