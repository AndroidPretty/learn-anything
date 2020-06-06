import gql from "graphql-tag"
import { useQuery } from "urql"
import Header from "../components/header"
import Link from "../components/link"

// TODO: Grab IDs of the current user's bookmarks
const query = gql`
  query {
    links {
      id
    }
  }
`

const BookmarksPage = () => {
  const [result] = useQuery({
    query: query,
  })

  return (
    <div>
      <Header />
      {result.data.links.map((link) => (
        <Link id={link.id} />
      ))}
    </div>
  )
}

export default BookmarksPage
