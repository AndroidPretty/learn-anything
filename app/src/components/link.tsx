import React, { useState } from "react"
import gql from "graphql-tag"
import { useQuery } from "urql"
import { Bookmark, BookmarkFill, Heart, HeartFill } from "./icons"

const linkQuery = gql`
  query($id: Int!) {
    links_aggregate(where: { id: { _eq: $id } }) {
      nodes {
        name
        comment
        url
      }
    }
  }
`

const Link = ({ id }) => {
  const [result] = useQuery({
    query: linkQuery,
    variables: { id },
  })
  const link = result.data.links_aggregate.nodes[0]

  // TODO: Grab state from query
  const [saved, setSaved] = useState(false)

  return (
    <div style={{ marginBottom: "var(--gap)" }}>
      <a href={link.url}>{link.name}</a>
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
