import * as trpc from "@trpc/server";
import { z } from "zod";

export const appRouter = trpc
	.router()
	.query("getUser", {
		async resolve(req) {
			return { name: "Bilbo" };
		},
	})
	.mutation("createUser", {
		input: z.object({ name: z.string().min(5) }),
		async resolve(req) {
			return [];
		},
	});

export type AppRouter = typeof appRouter;
