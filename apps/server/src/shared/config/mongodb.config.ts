import { z } from "zod";
import { validate } from "./validate";

const validationSchema = z.object({
	MONGODB_URL: z.string(),
});

export const mongodbConfig = validate(validationSchema);
