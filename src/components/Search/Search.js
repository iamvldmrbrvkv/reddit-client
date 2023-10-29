import { useRef } from "react"
import { createSearchParams, useNavigate } from "react-router-dom"

function Search() {
  const navigate = useNavigate()
  const searchInputRef = useRef()
  const onSearchHandler = e => {
    e.preventDefault()
    if (searchInputRef.current.value.length > 0) {
      const searchQuery = {
        q: searchInputRef.current.value
      }
      const query = createSearchParams(searchQuery)
      navigate({
        pathname: 'search/',
        search: `?${query}`
      })
    }
  }
  
  return (
    <form onSubmit={onSearchHandler}>
      <input
        type="text"
        name="search"
        id="search"
        ref={searchInputRef}
        placeholder="Search Reddit"
      />
    </form>
  )
}

export default Search