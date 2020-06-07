import { useState, useRef } from "react"
import { useRouter } from "next/router"
import { useMutation } from "urql"
import { createLinkMutation } from "../lib/mutations"
import { Plus, Bookmark, User } from "../components/icons"

const Header = () => {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const titleInputEl = useRef(null)
  const urlInputEl = useRef(null)
  const [state, setState] = useState({
    title: null,
    url: null,
  })
  const updateTitle = async () => {
    const input = titleInputEl.current.value
    if (input == "") {
      setState({
        ...state,
        title: null,
      })
    } else {
      setState({
        ...state,
        title: input,
      })
    }
  }
  const updateUrl = async () => {
    const input = urlInputEl.current.value
    if (input == "") {
      setState({
        ...state,
        url: null,
      })
    } else {
      setState({
        ...state,
        url: input,
      })
    }
  }

  const [addLinkResult, addLink] = useMutation(createLinkMutation)

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <h1 onClick={(e) => router.push("/")} style={{ cursor: "pointer" }}>
          Learn Anything
        </h1>
        <div
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          <span onClick={(e) => setOpen(!open)} style={{ cursor: "pointer" }}>
            <Plus size={28} />
          </span>
          {/* Only show these icons when authenticated */}
          <span
            onClick={(e) => router.push("/bookmarks")}
            style={{ cursor: "pointer" }}
          >
            <Bookmark size={28} />
          </span>
          {/* Placeholder, show user avatar once authenticated */}
          <User size={28} />
          {/* TODO: Show underneath user avatar */}
          {/* <Link size={28} /> */}
        </div>
      </div>
      {/* New Link Modal */}
      <div
        style={{
          display: `${open ? "block" : "none"}`,
          position: "fixed",
          zIndex: 1,
          paddingTop: "100px",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          overflow: "auto",
          backgroundColor: "rgba(0,0,0,0.4)",
        }}
      >
        <div
          style={{
            backgroundColor: "var(--overlay)",
            margin: "auto",
            padding: "20px",
            // border: "1px solid #888",
            width: "50%",
          }}
        >
          <h2>New link</h2>
          <div>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              ref={titleInputEl}
              onChange={updateTitle}
              type="text"
            />
          </div>
          <div>
            <label htmlFor="url">URL</label>
            <input id="url" ref={urlInputEl} onChange={updateUrl} type="text" />
          </div>
          <button
            onClick={(e) => {
              addLink({ object: { name: state.title, url: state.url } })
              setOpen(false)
            }}
          >
            Create
          </button>
        </div>
      </div>
    </>
  )
}

export default Header
