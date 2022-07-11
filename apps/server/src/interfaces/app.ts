import express, { Express } from "express";

export const createApp = async (): Promise<Express> => {
	const app = express();
	// const corsMiddleware = cors({
	//   origin: [appConfig.APP_URL],
	// });

	// app.disable('x-powered-by');
	// app.use(helmet());
	// app.use(corsMiddleware);
	// app.options('*', corsMiddleware);
	// app.use(express.json());

	// const v1Router = getV1Router({ formsRouter: formsConfig.formsRouter });

	// app.use('/v1', v1Router);

	// app.use((req: Request, res: Response, next: NextFunction) => {
	//   if (!req.route) {
	//     res.sendStatus(404);
	//   }

	//   next();
	// });

	// app.use(errorHandlingMiddleware);

	return app;
};
