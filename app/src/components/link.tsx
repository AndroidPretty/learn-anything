import React, { useState } from "react"
import gql from "graphql-tag"
import { useQuery, useMutation } from "urql"
import { deleteLinkMutation } from "../lib/mutations"
import { Bookmark, BookmarkFill } from "./icons"

const linkQuery = gql`
  query($id: uuid!) {
    links_by_pk(id: $id) {
      name
      comment
      url
    }
  }
`

const Link = ({ id }) => {
  const [result] = useQuery({
    query: linkQuery,
    variables: { id },
  })
  const link = result.data.links_by_pk

  // TODO: Grab state from user query
  const [saved, setSaved] = useState(false)

  const [removeLinkResult, removeLink] = useMutation(deleteLinkMutation)

  return (
    <div style={{ marginBottom: "var(--gap)" }}>
      <div style={{ display: "flex" }}>
        <a href={link.url}>{link.name}</a>
        <div
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          <button onClick={(e) => removeLink({ id })}>Delete</button>
        </div>
      </div>
      <blockquote style={{ marginTop: "var(--small-gap)" }}>
        {link.comment}
      </blockquote>
      <div style={{ display: "flex", marginTop: "var(--small-gap)" }}>
        <span
          onClick={(e) => setSaved(!saved)}
          style={{ cursor: "pointer", color: "var(--red)" }}
        >
          {saved ? <BookmarkFill /> : <Bookmark />}
        </span>
        {/* {` / `} */}
        <span style={{ fontStyle: "italic", color: "var(--gray)" }}>
          {link.url.split("/")[2]}
        </span>
      </div>
    </div>
  )
}

export default Link
