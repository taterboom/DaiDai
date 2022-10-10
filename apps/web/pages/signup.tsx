import Auth from "app/src/Auth"
import dynamic from "next/dynamic"

const DaidaiModel = dynamic(() => import("../components/DaidaiModel"), { ssr: false })

const Signup = () => {
  return (
    <div className="h-screen">
      <DaidaiModel />
      {/* <Auth type="signup" /> */}
    </div>
  )
}

export default Signup
