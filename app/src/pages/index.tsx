import gql from "graphql-tag"
import React from "react"
import { useQuery } from "urql"
import { Plus, Bookmark, Link, User } from "../components/icons"

const query = gql`
  query {
    link {
      name
    }
  }
`

const IndexPage = () => {
  const [result] = useQuery({
    query: query,
  })

  if (result.fetching || !result.data) {
    return null
  }

  if (result.error) {
    return null
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <h1>Learn Anything</h1>
        <div
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          <Plus />
          {/* Only show these icons when authenticated */}
          <Bookmark />
          <Link />
          {/* Placeholder, show user avatar once authenticated */}
          <User />
        </div>
      </div>
      <ul>
        {result.data.link.map((link) => (
          <li>{link.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default IndexPage
