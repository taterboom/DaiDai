import { useUser } from "@supabase/auth-helpers-react"
import clsx from "classnames"
import React, { useEffect, useMemo, useRef, useState } from "react"
import { toast } from "react-toastify"
import { useUpdateEffect } from "react-use"
import useDaiDaiStore from "./store/daidai"
import DaidaiObject from "./store/DaidaiObject"
import { Bookmark, bookmarkHTMLString2json } from "./utils/bookmarkHtml2json"
import { TOAST_CONFIG } from "./utils/toast"
import Button from "ui/src/Button"
import { MaterialSymbolsSave, Upload } from "ui/src/icons"
import Popup from "ui/src/Popup"
import { useLocalstorageState } from "ui/src/useLocalstorageState"

const HTMLInput = ({ onChange }: { onChange: (json: Bookmark[]) => void }) => {
  const handleFile = (file: File) => {
    const fileReader = new FileReader()
    fileReader.onload = (e) => {
      try {
        const json = bookmarkHTMLString2json((e.target?.result as string) || "")
        onChange(json)
      } catch (err) {
        //
      }
    }
    fileReader.readAsText(file)
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFile(file)
    }
  }

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0]
      if (file.type.includes("html")) {
        handleFile(file)
      }
    }
  }

  return (
    <div
      className="upload"
      onDragOver={(e) => {
        e.preventDefault()
      }}
      onDrop={handleFileDrop}
    >
      <label htmlFor="dropzone-file" className="upload-content text-primary-content">
        <div className="upload-placeholder">
          <Upload />
          <p className="upload-tips mt-4">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="upload-tips">your bookmarks.html</p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="upload-input"
          onChange={handleFileChange}
        />
      </label>
    </div>
  )
}

type BookmarkImporterPopupProps = {
  children?: React.ReactNode
  show: boolean
  onClose: () => void
}

const BookmarkImporterPopupPopup = (props: BookmarkImporterPopupProps) => {
  return (
    <Popup show={props.show} onClose={props.onClose} closeOnClickAway={false}>
      <BookmarkImporter />
    </Popup>
  )
}

const BookmarkImporter = () => {
  const user = useUser()
  const add = useDaiDaiStore((state) => state.add)
  const [bookmarks, setBookmarks] = useState<Bookmark[] | null>(null)

  const submit = (result: Bookmark[]) => {
    if (!user) {
      toast.error("Should login first!", TOAST_CONFIG)
      return
    }
    if (result && result.length > 0) {
      add(user.id, ...result.map((item) => DaidaiObject.generateFromBookmark(item))).then(
        () => {
          toast.success("Success!", TOAST_CONFIG)
        },
        (e) => {
          toast.error("Faild!", TOAST_CONFIG)
          console.error("error: ", e)
        }
      )
    }
  }

  return (
    <div className="pannel">
      {bookmarks ? (
        <BookmarksSelect value={bookmarks} onSubmit={submit} />
      ) : (
        <div className="flex justify-between w-[800px] ">
          <HTMLInput onChange={(e) => setBookmarks(e)} />
        </div>
      )}
    </div>
  )
}

const BookmarksSelect = ({
  value,
  onSubmit,
}: {
  value: Bookmark[]
  onSubmit: (e: Bookmark[]) => void
}) => {
  const daidaiObjectUrlSet = useDaiDaiStore((state) => new Set(state.data.map((item) => item.url)))
  const [ignoreFirstTagChecked, setIgnoreFirstTagChecked] = useLocalstorageState(
    "__daidai_ift",
    false
  )
  const [ignoreDuplicatedItemsChecked, setIgnoreDuplicatedItemsChecked] = useLocalstorageState(
    "__daidai_idi",
    false
  )
  const initCheckedItems = () => {
    const _checkedItemSet = new Set<number>()
    for (let i = 0; i < value.length; i++) {
      if (!(ignoreDuplicatedItemsChecked && daidaiObjectUrlSet.has(value[i].url))) {
        _checkedItemSet.add(i)
      }
    }
    return _checkedItemSet
  }
  const [checkedItemSet, setCheckedItemSet] = useState(initCheckedItems)
  const selectAllRef = useRef<HTMLInputElement>(null)

  const displayValue = useMemo(
    () =>
      value.map((item, index) => ({
        ...item,
        duplicated: daidaiObjectUrlSet.has(item.url),
        checked: checkedItemSet.has(index),
      })),
    [checkedItemSet, daidaiObjectUrlSet, value]
  )

  useUpdateEffect(() => {
    if (ignoreDuplicatedItemsChecked) {
      setCheckedItemSet((v) => {
        const newSet = new Set(v)
        v.forEach((item) => {
          if (daidaiObjectUrlSet.has(value[item]?.url)) {
            newSet.delete(item)
          }
        })
        return newSet
      })
    }
  }, [ignoreDuplicatedItemsChecked])

  const submit = () => {
    onSubmit(
      displayValue
        .filter((item) => item.checked)
        .map((item) => ({
          url: item.url,
          title: item.title,
          tags: item.tags.slice(ignoreFirstTagChecked ? 1 : 0),
        }))
    )
  }

  useEffect(() => {
    if (!selectAllRef.current) return
    selectAllRef.current.indeterminate =
      checkedItemSet.size > 0 && checkedItemSet.size < value.length
  }, [checkedItemSet, value.length])

  return (
    <div className="overflow-y-auto max-w-[80vw] max-h-[80vh] w-[800px] 2xl:w-[1024px] h-[600px] 2xl:h-[768px]">
      <div className="flex justify-between items-center mt-4 handlebar">
        <div className="flex gap-8">
          <label className="label cursor-pointer gap-2">
            <input
              type="checkbox"
              className="checkbox"
              checked={ignoreFirstTagChecked}
              onChange={(e) => setIgnoreFirstTagChecked(e.target.checked)}
            ></input>
            <span className="label-text">Ignore first tag</span>
          </label>
          <label className="label cursor-pointer gap-2">
            <input
              type="checkbox"
              className="checkbox"
              checked={ignoreDuplicatedItemsChecked}
              onChange={(e) => {
                setIgnoreDuplicatedItemsChecked(e.target.checked)
              }}
            ></input>
            <span className="label-text">Ignore duplicated items</span>
          </label>
        </div>
        <Button
          className="flex items-center gap-1"
          onClick={() => {
            submit()
          }}
        >
          <MaterialSymbolsSave /> Save
        </Button>
      </div>
      <table className="table table-compact w-full mt-4">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                className="checkbox block"
                ref={selectAllRef}
                checked={checkedItemSet.size === value.length}
                onChange={(e) =>
                  e.target.checked
                    ? setCheckedItemSet(
                        new Set(Array.from({ length: value.length }).map((_, index) => index))
                      )
                    : setCheckedItemSet(new Set())
                }
              ></input>
            </th>
            <th>Site</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>
          {displayValue.map((item, index) => (
            <tr key={index} className={clsx(item.duplicated && "text-warning")}>
              <td>
                <input
                  type="checkbox"
                  className="checkbox block"
                  checked={item.checked}
                  onChange={(e) =>
                    e.target.checked
                      ? setCheckedItemSet((v) => new Set(v).add(index))
                      : setCheckedItemSet((v) => {
                          const newSet = new Set(v)
                          newSet.delete(index)
                          return newSet
                        })
                  }
                ></input>
              </td>
              <td>
                <a href={item.url}>{item.title}</a>
              </td>
              <td>
                {item.tags.map((tag, index) => (
                  <span
                    key={index}
                    className={clsx(index === 0 && ignoreFirstTagChecked && "line-through", "px-1")}
                  >
                    #{tag}
                  </span>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default BookmarkImporterPopupPopup
