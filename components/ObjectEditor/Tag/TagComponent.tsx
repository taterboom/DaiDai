import {
  $getNodeByKey,
  $getSelection,
  $isNodeSelection,
  CLICK_COMMAND,
  COMMAND_PRIORITY_LOW,
  KEY_BACKSPACE_COMMAND,
  KEY_DELETE_COMMAND,
  NodeKey,
} from "lexical"
import { useLexicalNodeSelection } from "@lexical/react/useLexicalNodeSelection"
import clsx from "classnames"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useCallback, useEffect, useRef } from "react"
import { $isTagNode } from "./TagNode"
import { mergeRegister } from "@lexical/utils"

export const TagComponent = ({ tag, nodeKey }: { tag: string; nodeKey: NodeKey }) => {
  const [editor] = useLexicalComposerContext()
  const elRef = useRef<HTMLElement>(null)
  const [isSelected, setSelected, clearSelection] = useLexicalNodeSelection(nodeKey)

  const onDelete = useCallback(
    (payload: KeyboardEvent) => {
      if (isSelected && $isNodeSelection($getSelection())) {
        const event: KeyboardEvent = payload
        event.preventDefault()
        const node = $getNodeByKey(nodeKey)
        if ($isTagNode(node)) {
          node.remove()
        }
        setSelected(false)
      }
      return false
    },
    [isSelected, nodeKey, setSelected]
  )

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        CLICK_COMMAND,
        (event: MouseEvent) => {
          const container = elRef.current

          // @ts-ignore
          if (container?.contains(event.target)) {
            if (!event.shiftKey) {
              clearSelection()
            }
            setSelected(!isSelected)
            return true
          }

          return false
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(KEY_DELETE_COMMAND, onDelete, COMMAND_PRIORITY_LOW),
      editor.registerCommand(KEY_BACKSPACE_COMMAND, onDelete, COMMAND_PRIORITY_LOW)
    )
  }, [clearSelection, editor, isSelected, onDelete, setSelected])

  return (
    <span
      ref={elRef}
      className={clsx(
        "px-2 rounded border bg-gray",
        isSelected ? " border-blue-400" : "border-black"
      )}
    >
      <span>#</span>
      <span className="">{tag}</span>
    </span>
  )
}

export default TagComponent
