/* eslint-disable react/no-unescaped-entities */
import Button, { LinkButton } from "../components/Common/Button"
import { supabaseClient } from "@supabase/auth-helpers-nextjs"
import { useState } from "react"
import { ApiError } from "@supabase/supabase-js"

const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [signError, setSignUpError] = useState<ApiError | null>(null)
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

  const signWithEmailAndPassword = async () => {
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
    <div className="h-screen flex justify-center items-center">
      <div className="space-y-4 bg-neutral/30 p-4 ">
        <div>{loading && "loading..."}</div>
        <Button disableDefaultStyle className="btn-sm btn-block" onClick={() => signInWithGoogle()}>
          {type === "signin" ? "Sign in" : "Sign up"} with Google
        </Button>
        <Button disableDefaultStyle className="btn-sm btn-block" onClick={() => signInWithGithub()}>
          {type === "signin" ? "Sign in" : "Sign up"} with Github
        </Button>
        <div className="divider">OR</div>
        <div>
          <form
            className="space-y-4"
            onSubmit={() => {
              signWithEmailAndPassword
            }}
          >
            <div className="form-control">
              <input
                type="text"
                placeholder="Email"
                className="input input-bordered input-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-control">
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered input-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              disableDefaultStyle
              className="btn-sm btn-block"
              onClick={() => signWithEmailAndPassword()}
            >
              {type === "signin" ? "Sign in" : "Sign up"}
            </Button>
            <div>{signError && signError.message}</div>
            <div>{shouldConfirm && "Should confirm email!"}</div>
            <div className="space-y-2 text-xs">
              {type === "signin" ? (
                <>
                  <p>
                    Don't have an account yet?
                    <LinkButton disableDefaultStyle className="btn-xs btn-ghost" href="/signup">
                      Sign up here
                    </LinkButton>
                  </p>
                  <p>
                    Forgot password?{" "}
                    <LinkButton disableDefaultStyle className="btn-xs btn-ghost" href="">
                      Reset password here
                    </LinkButton>
                  </p>
                </>
              ) : (
                <p>
                  Already have an account?
                  <LinkButton disableDefaultStyle className="btn-xs btn-ghost" href="/signin">
                    Sign in here
                  </LinkButton>
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Auth
