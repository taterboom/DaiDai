import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { mergeRegister } from "@lexical/utils"
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_CRITICAL,
  COMMAND_PRIORITY_LOW,
  KEY_ARROW_DOWN_COMMAND,
  KEY_ARROW_UP_COMMAND,
  KEY_ENTER_COMMAND,
  SELECTION_CHANGE_COMMAND,
} from "lexical"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import useDaiDaiStore from "../../../store/daidai"
import { selectTags } from "../../../store/selector"
import { setFloatingElemPosition } from "../utils"
import clsx from "classnames"
import Fuse from "fuse.js"

type FloatingTagEditorProps = {
  value: string
  onChange?: (value: string) => void
}

export function FloatingTagEditor({ value, onChange }: FloatingTagEditorProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [editor] = useLexicalComposerContext()
  const tags = useDaiDaiStore(selectTags)
  const fuse = useMemo(() => new Fuse(tags, { threshold: 0.4 }), [tags])
  const options = useMemo(
    () => (value.length > 1 ? fuse.search(value) : tags.map((item) => ({ item }))),
    [value, fuse, tags]
  )
  const resultRef = useRef<string>()
  resultRef.current = options[currentIndex]?.item
  const editorRef = useRef(null)

  const updateTag = useCallback(() => {
    const editorEl = editorRef.current
    const selection = $getSelection()
    if ($isRangeSelection(selection) && selection.isCollapsed() && editorEl) {
      const nativeSelection = window.getSelection()
      const rootElement = editor.getRootElement()
      if (rootElement && nativeSelection && rootElement.contains(nativeSelection.anchorNode)) {
        const domRange = nativeSelection.getRangeAt(0)
        let rect
        if (nativeSelection.anchorNode === rootElement) {
          let inner = rootElement
          while (inner.firstElementChild != null) {
            inner = inner.firstElementChild as HTMLElement
          }
          rect = inner.getBoundingClientRect()
        } else {
          rect = domRange.getBoundingClientRect()
        }
        setFloatingElemPosition(rect, editorEl, document.body)
      } else {
        setFloatingElemPosition(null, editorEl, document.body)
      }
    }
  }, [editor])

  useEffect(() => {
    const scrollerElem = document.body
    const update = () => {
      editor.getEditorState().read(() => {
        updateTag()
      })
    }
    window.addEventListener("resize", update)
    if (scrollerElem) {
      scrollerElem.addEventListener("scroll", update)
    }
    return () => {
      window.removeEventListener("resize", update)
      if (scrollerElem) {
        scrollerElem.removeEventListener("scroll", update)
      }
    }
  }, [editor, updateTag])

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        KEY_ARROW_DOWN_COMMAND,
        (e) => {
          e.preventDefault()
          setCurrentIndex((i) => (i = i < options.length - 1 ? i + 1 : 0))
          return true
        },
        COMMAND_PRIORITY_CRITICAL
      ),
      editor.registerCommand(
        KEY_ARROW_UP_COMMAND,
        (e) => {
          e.preventDefault()
          setCurrentIndex((i) => (i = i > 0 ? i - 1 : options.length - 1))
          return true
        },
        COMMAND_PRIORITY_CRITICAL
      ),
      editor.registerCommand(
        KEY_ENTER_COMMAND,
        (e) => {
          if (resultRef.current) {
            e?.preventDefault()
            onChange?.(resultRef.current)
            return true
          }
          return false
        },
        COMMAND_PRIORITY_CRITICAL
      ),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateTag()
          return true
        },
        COMMAND_PRIORITY_LOW
      )
    )
  }, [editor, onChange, options.length, updateTag])

  return (
    <div
      ref={editorRef}
      className={clsx(
        "fixed bg-neutral-900/30 min-w-[150px] p-2",
        options.length === 0 && "!invisible"
      )}
      style={{ left: -9999, top: -9999 }}
    >
      <ul>
        {options.map(({ item }, index) => (
          <li key={item} className={clsx(index === currentIndex && "bg-secondary")}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
