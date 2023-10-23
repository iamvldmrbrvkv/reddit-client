import logo from '../../reddit-logo.png'
import SearchReddit from "../SearchReddit/SearchReddit"

function NavBar() {
  return (
    <div>
      <img src={logo} alt='logo'/>
      <h1>
        Reddit Client
      </h1>
      <span>r/reddit</span> | <span>r/help</span> | <span>r/redditdev</span> | <span>r/bugs</span>
      <SearchReddit />
    </div>
  )
}

export default NavBar