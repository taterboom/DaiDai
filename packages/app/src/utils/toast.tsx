import { toast, ToastOptions } from "react-toastify"
import { LinkButton } from "ui/src/Button"

export const TOAST_CONFIG: ToastOptions = {
  hideProgressBar: true,
  theme: "dark",
  autoClose: 3000,
  className: "w-[400px]",
}

const AuthToast = () => {
  return (
    <div className="space-y-2">
      <p className="text-lg font-semibold">Features are available after Login.</p>
      <div className="flex justify-end">
        <LinkButton href="/signin" shallow>
          Sign in
        </LinkButton>
        <LinkButton href="/signup" shallow>
          Get Daidai free
        </LinkButton>
      </div>
    </div>
  )
}

export const authToast = () => toast(AuthToast, TOAST_CONFIG)
