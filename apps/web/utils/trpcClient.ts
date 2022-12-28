import { createTRPCProxyClient, httpBatchLink } from "@trpc/client"
import type { AppRouter } from "server/trpc"

export const trpcClient = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "https://local.daidai.cyou:3000/api/trpc",
    }),
  ],
})
