import { appRouter } from "server/trpc"

export const trpcCaller = appRouter.createCaller({})
