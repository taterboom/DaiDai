// 输入url/html
// 输出json

import { useLazyQuery, useMutation, useQuery } from "@apollo/client"
import { Base64 } from "js-base64"
import dynamic from "next/dynamic"
import React, { useEffect, useState } from "react"
import {
  CreateCommitOnBranch,
  ViewerRepositories,
  ViewerRepositoryBrancheFirstCommit,
  ViewerRepositoryBranches,
  ViewerRepositoryFilesBlob,
  ViewerRepositoryFilesTree,
} from "../../apis/github"
import { useSettings } from "../../contexts/settings"
import { bookmarkHTMLString2json } from "../../utils/bookmarkHtml2json"
import Popup from "../Common/Popup"
import Fade from "../Common/Fade"
import ClickAway from "../Common/ClickAway"
import Button from "../Common/Button"

const Editor = dynamic(() => import("../Common/Editor"), { ssr: false })

type DataOriginType = "github" | "html"

const HTMLInput = ({ onChange }: { onChange: (json: any) => void }) => {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
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
    console.log(e.target.files)
  }

  return (
    <div className="w-[800px] h-[600px]">
      <input type="file" onChange={handleFileChange} />
    </div>
  )
}

function GithubSelect(props: { type: "blob"; onSelect: (content: string) => void }): JSX.Element
function GithubSelect(props: { type: "branch"; onSelect: (branch: any) => void }): JSX.Element
function GithubSelect({
  onSelect,
  type,
}: {
  onSelect: (...args: any[]) => void
  type: "blob" | "branch"
}) {
  const [repositoryName, setRepositoryName] = useState("")
  const [branchName, setBranchName] = useState("")
  const [pathChunks, setPathChunks] = useState<string[]>([])
  const { data, loading } = useQuery(ViewerRepositories)
  const [getBranches, { data: branchesData, loading: branchesLoading }] =
    useLazyQuery(ViewerRepositoryBranches)
  const [filesData, setFilesData] = useState<any[]>([])
  const [getFilesTree, { data: filesTreeData, loading: filesTreeLoading }] = useLazyQuery(
    ViewerRepositoryFilesTree,
    {
      onCompleted: (data) => {
        if (data.viewer.repository.object?.entries.length === 0) return
        const index = data.viewer.repository.object.entries[0].path.split("/").length - 1
        setFilesData((d) => {
          d.splice(index, d.length, data.viewer.repository.object.entries)
          return [...d]
        })
      },
      onError: (e) => {
        alert(e.message)
      },
    }
  )
  const [getBlob] = useLazyQuery(ViewerRepositoryFilesBlob, {
    onCompleted: (data) => {
      onSelect(data.viewer.repository.object.text)
    },
    onError: (err) => {
      alert(err.message)
    },
  })
  const [getBranchFirstCommitId] = useLazyQuery(ViewerRepositoryBrancheFirstCommit, {
    onCompleted: (data) => {
      const {
        node: { id: branchId },
      } = branchesData.viewer.repository.refs.edges.find(
        (item: any) => item.node.name === branchName
      )
      onSelect({
        branchId: branchId,
        expectedHeadOid: data.viewer.repository.ref.target.oid,
      })
    },
    onError: (err) => {
      alert(err.message)
    },
  })
  useEffect(() => {
    if (pathChunks.length > 0) {
      const filePath = `${branchName}:${pathChunks.join("/")}`
      getFilesTree({
        variables: { repositoryName: repositoryName, expression: filePath },
      })
    } else if (branchName) {
      if (type === "branch") {
        getBranchFirstCommitId({
          variables: { name: repositoryName, qualifiedName: `refs/heads/${branchName}` },
        })
      } else {
        getFilesTree({
          variables: { repositoryName: repositoryName, expression: `${branchName}:` },
        })
      }
    } else if (repositoryName) {
      getBranches({ variables: { name: repositoryName } })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathChunks, repositoryName, branchName])

  const renderRepositoriesTree = () => (
    <ul className="p-2 shrink-0 overflow-auto">
      {loading
        ? "loading"
        : data.viewer.repositories.edges.map((item: any, index: number) => (
            <li
              key={`r${index}`}
              onClick={() => {
                setRepositoryName(item.node.name)
              }}
            >
              {item.node.name}
            </li>
          ))}
    </ul>
  )
  const renderBranchesTree = () => (
    <ul className="p-2 shrink-0 overflow-auto">
      {branchesLoading || !branchesData
        ? "loading"
        : branchesData.viewer.repository.refs.edges.map((item: any, index: number) => (
            <li key={`b${index}`} onClick={() => setBranchName(item.node.name)}>
              {item.node.name}
            </li>
          ))}
    </ul>
  )
  const renderFilesTree = () => {
    const nodes: React.ReactNode[] = []
    for (let index = 0; index <= pathChunks.length; index++) {
      nodes.push(
        <ul key={index} className="p-2 shrink-0 overflow-auto">
          {index === pathChunks.length && (filesTreeLoading || !filesData[index])
            ? "loading"
            : filesData[index].map((d: any, i: number) => (
                <li
                  key={i}
                  onClick={() => {
                    if (d.type === "blob") {
                      if (type === "blob") {
                        getBlob({
                          variables: { repositoryName, expression: `${branchName}:${d.path}` },
                        })
                      }
                    } else {
                      setPathChunks((p) => {
                        p.splice(index, p.length, d.name)
                        return [...p]
                      })
                    }
                  }}
                >
                  {d.type}:{d.name}
                </li>
              ))}
        </ul>
      )
    }
    return nodes
  }

  return (
    <div className="flex overflow-auto h-[600px] min-w-[800px]">
      {renderRepositoriesTree()}
      {repositoryName ? renderBranchesTree() : null}
      {type === "blob" && branchName ? renderFilesTree() : null}
    </div>
  )
}

const SaveToGithub = ({ text }: { text: string }) => {
  const [show, setShow] = useState(false)
  const [createCommit] = useMutation(CreateCommitOnBranch, {
    onCompleted: (data) => {
      alert(`successfully saved `)
    },
  })
  return (
    <>
      <Button onClick={() => setShow(true)}>Save to Github</Button>
      <Popup
        show={show}
        onClose={() => {
          setShow(false)
        }}
      >
        <GithubSelect
          type="branch"
          onSelect={({ branchId, expectedHeadOid }) => {
            setShow(false)
            createCommit({
              variables: {
                branchId,
                expectedHeadOid,
                message: {
                  headline: "commit the json file generated by daidai.taterbomb.top",
                },
                fileChanges: {
                  additions: [
                    {
                      path: "daidai.json",
                      contents: Base64.encode(text),
                    },
                  ],
                },
              },
            })
          }}
        ></GithubSelect>
      </Popup>
    </>
  )
}

const DataOriginImporter = ({ onChange }: { onChange: (type: DataOriginType) => void }) => {
  const [importMenuShow, setImportMenuShow] = useState(false)

  return (
    <div className="relative inline-block">
      <Button onClick={() => setImportMenuShow(true)}>Import</Button>
      <Fade in={importMenuShow}>
        <div className="absolute z-10">
          <ClickAway onClickAway={() => setImportMenuShow(false)}>
            <div className="flex flex-col bg-white shadow-ios rounded">
              <Button
                className="!shadow-none hover:bg-gray-200/70"
                onClick={() => onChange("github")}
              >
                github
              </Button>
              <Button
                className="!shadow-none hover:bg-gray-200/70"
                onClick={() => onChange("html")}
              >
                html
              </Button>
            </div>
          </ClickAway>
        </div>
      </Fade>
    </div>
  )
}

const DataOrigin: React.FC = () => {
  const {
    value: { dataOrigin },
    onChange,
  } = useSettings()
  const [type, setType] = useState<DataOriginType | null>(null)
  const [jsonStr, setJsonStr] = useState(() => JSON.stringify(dataOrigin))

  const setDataOrigin = (jsonStr?: string, silent: boolean = true) => {
    if (!jsonStr) return
    try {
      const newDataOrigin = JSON.parse(jsonStr)
      setJsonStr(jsonStr)
      onChange({
        dataOrigin: newDataOrigin,
      })
    } catch (err: any) {
      if (!silent) {
        alert(err.message)
      }
    }
  }

  const handleHtmlChange = (json: any) => {
    try {
      setJsonStr(JSON.stringify(json))
      onChange({
        dataOrigin: json,
      })
    } catch (err) {
      //
    }
  }

  return (
    <div className="">
      <div className="flex items-center justify-between">
        <div className="font-medium">Data Origin</div>
        <div className="flex">
          <div>
            <DataOriginImporter onChange={(type) => setType(type)}></DataOriginImporter>
          </div>
          <div>
            <SaveToGithub text={jsonStr}></SaveToGithub>
          </div>
        </div>
      </div>
      <div className="flex-1 mt-4">
        <div className="w-[600px]">
          <Editor language="json" value={jsonStr} onChange={setDataOrigin}></Editor>
        </div>
      </div>

      <Popup
        show={type === "html"}
        onClose={() => {
          setType(null)
        }}
      >
        <HTMLInput onChange={handleHtmlChange}></HTMLInput>
      </Popup>
      <Popup
        show={type === "github"}
        onClose={() => {
          setType(null)
        }}
      >
        <GithubSelect
          type="blob"
          onSelect={(jsonStr) => {
            setType(null)
            setDataOrigin(jsonStr, false)
          }}
        ></GithubSelect>
      </Popup>
      <Popup
        show={type === "github"}
        onClose={() => {
          setType(null)
        }}
      >
        <GithubSelect
          type="blob"
          onSelect={(jsonStr) => {
            setType(null)
            setDataOrigin(jsonStr, false)
          }}
        ></GithubSelect>
      </Popup>
    </div>
  )
}

export default DataOrigin
