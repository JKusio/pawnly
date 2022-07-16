import { ZodRawShape } from "zod";

export interface Procedure {
	input?: ZodRawShape;
	output?: unknown;
	resolve: () => any;
}
