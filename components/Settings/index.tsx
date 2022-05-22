import Link from "next/link"
import { useRouter } from "next/router"
import React, { useState } from "react"
import { IcSharpSettings } from "../Common/icons"
import Popup from "../Common/Popup"
import DataOrigin from "./DataOrigin"
import HighlightColor from "./HighlightColor"
import HrefTarget from "./HrefTarget"
import User from "./User"
import { MaterialSymbolsKeyboardBackspaceRounded } from "../Common/icons"
import Button from "../Common/Button"

const SettingsPanel: React.FC<{ show: boolean; onClose?: () => void }> = ({ show, onClose }) => {
  return (
    <Popup
      closeIcon={<MaterialSymbolsKeyboardBackspaceRounded />}
      centerY={false}
      show={show}
      onClose={onClose}
    >
      <div className="min-h-screen py-4">
        <ul className="grid grid-cols-2 grid-rows-[100px_100px_1fr] gap-4">
          <li className="row-span-2 rounded-2xl shadow-ios p-4">
            <div className="flex justify-center items-center h-full">
              <User></User>
            </div>
          </li>
          <li className="border rounded-2xl shadow-ios p-4">
            <HrefTarget></HrefTarget>
          </li>
          <li className="border rounded-2xl shadow-ios p-4">
            <HighlightColor></HighlightColor>
          </li>
          <li className="col-span-2 border rounded-2xl shadow-ios p-4">
            <DataOrigin></DataOrigin>
          </li>
        </ul>
      </div>
    </Popup>
  )
}

const Settings: React.FC = () => {
  const router = useRouter()
  const show = router.query.pannel === "settings"
  return (
    <>
      <Link href={router.pathname + "?pannel=settings"} passHref>
        <a>
          <Button rounded className="my-1">
            <IcSharpSettings></IcSharpSettings>
          </Button>
        </a>
      </Link>
      <SettingsPanel show={show} onClose={() => router.back()}></SettingsPanel>
    </>
  )
}

export default Settings
