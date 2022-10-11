import Auth from "app/src/Auth"
import dynamic from "next/dynamic"

const DaidaiModel = dynamic(() => import("../components/DaidaiModel"), { ssr: false })

const Signup = () => {
  return (
    <div className="flex items-center flex-col pt-32">
      <div className="w-[200px] h-[200px]">
        <DaidaiModel />
      </div>
      <Auth type="signup" />
    </div>
  )
}

export default Signup
