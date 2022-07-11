import { z } from "zod";
import { validate } from "./validate";

export enum AppEnvironment {
	DEVELOPMENT = "development",
	PRODUCTION = "production",
	TEST = "test",
	STAGING = "staging",
}

const validationSchema = z.object({
	NODE_ENV: z.nativeEnum(AppEnvironment),
	PORT: z.number().int().default(3000),
	APP_URL: z.string().url().default("http://localhost:3000"),
});

export const appConfig = validate(validationSchema);
