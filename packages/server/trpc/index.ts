import { userRouter } from "./routers/user"
import { router } from "./utils"

export const appRouter = router({
  user: userRouter,
})

export type AppRouter = typeof appRouter
