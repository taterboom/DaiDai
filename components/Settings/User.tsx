import { useQuery } from "@apollo/client"
import Cookies from "js-cookie"
import { useState } from "react"
import { WhoAmI } from "../../apis/github"
import { useConfigValue } from "../../contexts/config"
import Button from "../Common/Button"
import { EosIconsThreeDotsLoading, IcBaselineLogout, RadixIconsGithubLogo } from "../Common/icons"

const GithubUser = ({ onError }: { onError: () => void }) => {
  const { data, loading } = useQuery(WhoAmI, {
    onError: () => {
      onError()
    },
  })
  if (!data || loading) return <EosIconsThreeDotsLoading className="text-6xl" />
  return (
    <figure className="flex items-center">
      <img className="w-36 mr-4" src={data.viewer.avatarUrl}></img>
      <figcaption className="flex flex-col items-start">
        <h3 className="px-4 text-xl mb-1 max-w-[200px] truncate font-medium">
          {data.viewer.login}
        </h3>
        <Button
          onClick={() => {
            Cookies.remove("nekot")
            location.reload()
          }}
        >
          Logout
          <IcBaselineLogout className="inline ml-1 -mt-0.5" />
        </Button>
      </figcaption>
    </figure>
  )
}

const User = () => {
  const [fetchUserError, setFetchUserError] = useState(false)
  const { githubClientId } = useConfigValue()
  if (Cookies.get("nekot") && !fetchUserError) {
    return <GithubUser onError={() => setFetchUserError(true)}></GithubUser>
  }
  return (
    <div>
      <a href={`https://github.com/login/oauth/authorize?client_id=${githubClientId}&scope=repo`}>
        <Button>
          <RadixIconsGithubLogo className="inline mr-1 -mt-0.5" /> Login with Github
        </Button>
      </a>
    </div>
  )
}

export default User
