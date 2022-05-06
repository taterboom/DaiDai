import React, { useState } from "react"
import { IcSharpSettings } from "../Common/icons"
import Popup from "../Common/Popup"
import DataOrigin from "./DataOrigin"
import HighlightColor from "./HighlightColor"
import HrefTarget from "./HrefTarget"

const SettingsPanel: React.FC<{ show: boolean; onClose?: () => void }> = ({ show, onClose }) => {
  return (
    <Popup show={show} onClose={onClose}>
      <ul>
        <li>
          <div>连接打开方式</div>
          <div>
            <HrefTarget></HrefTarget>
          </div>
        </li>
        <li>
          <div>标签高亮颜色</div>
          <div>
            <HighlightColor></HighlightColor>
          </div>
        </li>
        <li>
          <div>数据源</div>
          <div>
            <DataOrigin></DataOrigin>
          </div>
        </li>
      </ul>
    </Popup>
  )
}

const Settings: React.FC<{ show: boolean; onChange?: (v: boolean) => void }> = ({
  show,
  onChange,
}) => {
  return (
    <>
      <button onClick={() => onChange?.(true)}>
        <IcSharpSettings></IcSharpSettings>
      </button>
      <SettingsPanel show={show} onClose={() => onChange?.(false)}></SettingsPanel>
    </>
  )
}

export default Settings
