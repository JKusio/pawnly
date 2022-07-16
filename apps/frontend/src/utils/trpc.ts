import { createReactQueryHooks } from '@trpc/react';
import { AppRouter } from 'pawnly-server';

export const trpc = createReactQueryHooks<AppRouter>();
