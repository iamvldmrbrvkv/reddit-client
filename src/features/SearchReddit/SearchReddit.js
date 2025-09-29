import { useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Posts from "../Subreddit/Posts/Posts"
import redditAPI from "../../services/redditAPI"

const SearchReddit = () => {
  const [searchParams] = useSearchParams()
  const params = searchParams.get('q')
  const [redditData, setRedditData] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const getSearchResults = async () => {
      if (!params) return

      setLoading(true)
      setError(null)
      
      try {
        const searchResults = await redditAPI.searchReddit(params)
        setRedditData(searchResults.data.children)
      } catch (err) {
        setError(`${err.name}: ${err.message}`)
        setRedditData(null)
      } finally {
        setLoading(false)
      }
    }
    
    getSearchResults()
  }, [params])

  return (
    <div>
      <h2>Search Results</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : !redditData ? (
        <p>Enter a search term</p>
      ) : redditData.length === 0 ? (
        <>
          <h3>Hm... we couldn't find any results for "{params}"</h3>
          <p>Double-check your spelling or try different keywords to adjust your search</p>
        </>
      ) : (
        <Posts posts={redditData} />
      )}
    </div>
  )
}

export default SearchReddit