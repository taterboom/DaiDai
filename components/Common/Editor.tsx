import MonacoEditor, { EditorProps } from "@monaco-editor/react"

const Editor: React.FC<EditorProps> = (props) => {
  return (
    <MonacoEditor
      {...props}
      height="70vh"
      theme="vs-dark"
      options={{
        lineNumber: "on",
        roundedSelection: true,
        minimap: { enabled: false },
        ...props.options,
      }}
    ></MonacoEditor>
  )
}

export default Editor
