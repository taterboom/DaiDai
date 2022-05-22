import Cookies from "js-cookie"

export function getToken() {
  return Cookies.get("nekot")
}

export function parseTokenFromCookie(cookieToken: string) {
  const [type, accessToken] = cookieToken.split(",")
  return {
    type,
    accessToken,
  }
}
