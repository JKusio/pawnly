import express, { Express } from "express";
import cors from "cors";
import * as trpcExpress from "@trpc/server/adapters/express";
import { getAppRouter } from "./trpc";
import { getChessGamesConfig } from "../modules/chessGames/application/ChessGamesConfig";
import { EloClient } from "../shared/common/utils/EloClient";
import { appConfig } from "../shared/config/app.config";
import helmet from "helmet";
import session from "express-session";
import passport from "passport";

export * from "./trpc";

export const createApp = async (): Promise<Express> => {
	const app = express();
	const corsMiddleware = cors({
		origin: [appConfig.APP_URL],
	});

	app.disable("x-powered-by");
	app.use(helmet());
	app.use(corsMiddleware);
	app.options("*", corsMiddleware);
	app.use(express.json());
	app.use(
		session({
			secret: appConfig.SESSION_SECRET,
			resave: false,
			saveUninitialized: false,
		})
	);

	app.use(passport.initialize());
	app.use(passport.session());

	const { chessGamesRouter } = getChessGamesConfig();

	const createContext = () => {
		return {};
	};

	app.use(
		"/trpc",
		trpcExpress.createExpressMiddleware({
			router: getAppRouter({ chessGamesRouter }),
			createContext,
		})
	);

	return app;
};
