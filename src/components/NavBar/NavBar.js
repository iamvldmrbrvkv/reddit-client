import logo from '../../reddit-logo.png'
import SearchReddit from "../SearchReddit/SearchReddit"

function NavBar() {
  return (
    <div>
      <img src={logo} alt='logo'/>
      <h1>
        Reddit Client
      </h1>
      <a href=''>r/reddit</a> | <a href=''>r/help</a> | <a href=''>r/redditdev</a> | <a href=''>r/bugs</a>
      <SearchReddit />
    </div>
  )
}

export default NavBar