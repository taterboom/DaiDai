import { prismaClient, procedure, router } from "../utils"

export const userRouter = router({
  getUsers: procedure
    // .input(
    //   z.object({
    //     email: z.string(),
    //     password: z.string(),
    //   })
    // )
    .query(async ({ input }) => {
      const result = await prismaClient.user.findMany()
      return {
        data: result,
      }
    }),
})

// export type definition of API
export type AppRouter = typeof userRouter
