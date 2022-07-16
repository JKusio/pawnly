import { z } from "zod";
import { validate } from "./validate";

export enum AppEnvironment {
	DEVELOPMENT = "development",
	PRODUCTION = "production",
	TEST = "test",
	STAGING = "staging",
}

const validationSchema = z.object({
	NODE_ENV: z.nativeEnum(AppEnvironment).default(AppEnvironment.DEVELOPMENT),
	PORT: z.number().int().default(3000),
	APP_URL: z.string().url().default("http://localhost:3001"),
	SESSION_SECRET: z.string().default("SESSION_SECRET"),
});

export const appConfig = validate(validationSchema);
