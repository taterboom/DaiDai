import { toast, ToastOptions } from "react-toastify"
import { LinkButton } from "ui/src/Button"

export const TOAST_CONFIG: ToastOptions = {
  hideProgressBar: true,
  theme: "dark",
  autoClose: 2500,
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

const OfflineToast = () => {
  return (
    <div className="space-y-2">
      <p className="text-lg font-semibold">
        You are in the Local Mode, bookmarks store locally in this mode. You can sign in or create
        an account for cloud sync and other functions.
      </p>
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

const offlineToast = () => toast(OfflineToast, TOAST_CONFIG)

export const offlineToastOnce = () => {
  if (localStorage.getItem("__daidai_offline_tip") !== "1") {
    offlineToast()
    localStorage.setItem("__daidai_offline_tip", "1")
  }
}
