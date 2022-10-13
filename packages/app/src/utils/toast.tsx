import { toast, ToastOptions } from "react-toastify"
import { LinkButton } from "ui/src/Button"

export const TOAST_CONFIG: ToastOptions = {
  hideProgressBar: true,
  theme: "dark",
  autoClose: 3000000,
  className: "w-[400px]",
}

const AuthToast = () => {
  return (
    <div className="space-y-2">
      <p className="text-lg font-semibold">Functions available after login.</p>
      <div className="flex justify-end space-x-2">
        <LinkButton href="/signin" shallow className="btn-outline">
          Sign in
        </LinkButton>
        <LinkButton href="/signup" shallow className="!btn-accent">
          Get Daidai free
        </LinkButton>
      </div>
    </div>
  )
}

export const authToast = () => toast(AuthToast, TOAST_CONFIG)
