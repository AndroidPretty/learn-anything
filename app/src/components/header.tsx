import { Plus, Bookmark, User } from "../components/icons"
import { useRouter } from "next/router"

const Header = () => {
  const router = useRouter()
  return (
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
        <Plus size={28} />
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
  )
}

export default Header
