import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { trpcCaller } from "../../../utils/trpcCaller"

export const authOptions = {
  // Configure one or more authentication providers
  // pages: {
  //   signIn: "/auth/signin",
  // },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // TODO db check

        const res = await trpcCaller.user.getUsers()
        const user = res.data[0]

        return {
          id: user.id + "",
          name: user.username,
          email: user.email,
          image: user.avatar,
        }
      },
    }),
  ],
}
export default NextAuth(authOptions)
