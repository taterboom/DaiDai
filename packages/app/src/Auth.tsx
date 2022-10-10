/* eslint-disable react/no-unescaped-entities */
import Button, { LinkButton } from "ui/src/Button"
import { supabaseClient } from "@supabase/auth-helpers-nextjs"
import { useEffect, useState } from "react"
import { ApiError } from "@supabase/supabase-js"
import clsx from "classnames"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import { TOAST_CONFIG } from "./utils/toast"

const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [signError, setSignUpError] = useState<ApiError | null>(null)
  const [shouldConfirm, setShouldConfirm] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (signError) {
      toast.error("Faild!", TOAST_CONFIG)
      console.error("error: ", signError)
    }
  }, [signError])

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

  const signWithEmailAndPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email || !password) return
    setLoading(true)
    console.log(type, email, password)
    const { error, user, session } = await (type === "signin"
      ? supabaseClient.auth.signIn({
          email,
          password,
        })
      : supabaseClient.auth.signUp({
          email,
          password,
        }))
    setSignUpError(error)
    setLoading(false)
    setShouldConfirm(!!user && !session)
    const _shouldConfirm = !!user && !session
    setShouldConfirm(_shouldConfirm)
    if (!error && !_shouldConfirm) {
      router.replace("/")
    }
  }

  return (
    <div className="space-y-4 bg-neutral/30 p-4 ">
      {shouldConfirm && (
        <div className="absolute inset-0 z-10 flex justify-center items-center bg-neutral/30 backdrop-blur-lg">
          Should confirm email!
        </div>
      )}
      <Button disableDefaultStyle className="btn-sm btn-block" onClick={(e) => signInWithGoogle()}>
        {type === "signin" ? "Sign in" : "Sign up"} with Google
      </Button>
      <Button disableDefaultStyle className="btn-sm btn-block" onClick={() => signInWithGithub()}>
        {type === "signin" ? "Sign in" : "Sign up"} with Github
      </Button>
      <div className="divider">OR</div>
      <div>
        <form className="space-y-4" onSubmit={signWithEmailAndPassword}>
          <div className="form-control">
            <input
              required
              type="email"
              placeholder="Email"
              className="input input-bordered input-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-control">
            <input
              required
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
            className={clsx("btn-sm btn-block", loading && "loading")}
          >
            {type === "signin" ? "Sign in" : "Sign up"}
          </Button>
          <div className="space-y-2 text-xs">
            {type === "signin" ? (
              <>
                <p>
                  Don't have an account yet?
                  <LinkButton disableDefaultStyle className="btn-xs btn-ghost" href="/signup">
                    Sign up here
                  </LinkButton>
                </p>
                {/* <p>
                    Forgot password?
                    <LinkButton disableDefaultStyle className="btn-xs btn-ghost" href="/todo">
                      Reset password here
                    </LinkButton>
                  </p> */}
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
  )
}

export default Auth
