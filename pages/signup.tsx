import Button from "../components/Common/Button"
import { supabaseClient } from "@supabase/auth-helpers-nextjs"
import { useState } from "react"
import { ApiError } from "@supabase/supabase-js"

const Signup = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [signUpError, setSignUpError] = useState<ApiError | null>(null)
  const [shouldConfirm, setShouldConfirm] = useState(false)

  const signInWithGoogle = async () => {
    setLoading(true)
    const { error, user, session } = await supabaseClient.auth.signIn({
      provider: "google",
    })
    setLoading(false)
  }

  const signInWithGithub = async () => {
    setLoading(true)
    const { error, user, session } = await supabaseClient.auth.signIn({
      provider: "github",
    })
    setLoading(false)
  }

  const signInWithEmailAndPassword = async () => {
    if (!email || !password) return
    setLoading(true)
    const { error, user, session } = await supabaseClient.auth.signUp({
      email,
      password,
    })
    setSignUpError(error)
    setLoading(false)
    setShouldConfirm(!!user && !session)
  }

  return (
    <div>
      <div>{loading && "loading..."}</div>
      <Button onClick={() => signInWithGoogle()}>Sign up with Google</Button>
      <Button onClick={() => signInWithGithub()}>Sign up with Github</Button>
      <div>
        <form
          onSubmit={() => {
            signInWithEmailAndPassword
          }}
        >
          <label>
            Email
            <input
              type="text"
              placeholder="Type here"
              className="input w-full max-w-xs"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              placeholder="Type here"
              className="input w-full max-w-xs"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <Button type="submit" onClick={() => signInWithEmailAndPassword()}>
            Sign up
          </Button>
          <div>{signUpError && signUpError.message}</div>
        </form>
        <div>{shouldConfirm && "Should confirm email!"}</div>
      </div>
    </div>
  )
}

export default Signup
