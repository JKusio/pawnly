import * as trpc from "@trpc/server";
import { z } from "zod";
import { ChessGamesFacade } from "../application/ChessGamesFacade";
import { GetChessGamesQueryInput } from "./GetChessGamesQueryInput";

export const getChessGamesRouter = ({
	chessGamesFacade,
}: {
	chessGamesFacade: ChessGamesFacade;
}) => {
	const chessGamesRouter = trpc.router().query("getChessGames", {
		input: z.object({
			piecesLeft: z.number().default(32),
			count: z.number().default(10),
			random: z.boolean().default(false),
		}),
		resolve: async ({ input }: { input: GetChessGamesQueryInput }) => {
			return chessGamesFacade.getChessGames(input);
		},
	});

	return chessGamesRouter;
};

export type ChessGamesRouter = ReturnType<typeof getChessGamesRouter>;
