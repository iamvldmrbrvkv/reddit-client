import { useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Posts from "../Subreddit/Posts/Posts"

const fetchSearchResults = async (query) => {
  try {
    const response = await fetch(`https://www.reddit.com/search/.json?q=${query}`)
    const json = await response.json()
    if (response.status !== 200) {
      const errorMessage = `${response.status}`
      throw new Error(errorMessage)
    }
    return json
  } catch (err) {
    return `${err.name}: ${err.message}`
  }
}

const SearchReddit = () => {
  const [searchParams] = useSearchParams()
  const params = searchParams.get('q')
  const [redditData, setRedditData] = useState()

  useEffect(() => {
    const getSearchResults = async () => {
      const searchResults = await fetchSearchResults(params)
      typeof searchResults === 'string' ? setRedditData(searchResults) : setRedditData(searchResults.data.children)
    }
    getSearchResults()
  }, [params])

  return (
    <div>
      <h2>Search Results</h2>
      {!redditData ? (
        <p>Loading...</p>
      ) : typeof redditData === 'string' ? (
        <p>{redditData}</p>
      ) : redditData.length === 0 ? (
        <>
          <h3>Hm... we couldn’t find any results for “{params}”</h3>
          <p>Double-check your spelling or try different keywords to adjust your search</p>
        </>
      ) : redditData && (
        <>
          <Posts posts={redditData} />
        </>
      )}
    </div>
  )
}

export default SearchReddit