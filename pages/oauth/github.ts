import { GetServerSideProps } from "next"
import React from "react"
import { setCookie } from "../../utils/cookie"

// eslint-disable-next-line react/display-name
export default () => React.createElement("div")

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      client_id: process.env.CLIENT_ID,
      code: context.query.code,
      client_secret: process.env.CLIENT_SECRET,
    }),
  }).then((res) => res.json())
  // 将token设置在cookie中，并且只能httpOnly
  setCookie(context.res, "nekot", `gh,${data.access_token}`, {
    // maxAge: 10 * 60 * 1000,
    path: "/",
    // httpOnly: true,
  })

  return {
    redirect: {
      destination: `/`,
      permanent: false,
    },
  }
}
