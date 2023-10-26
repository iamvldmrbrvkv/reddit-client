import logo from '../../reddit-logo.png'
import SearchReddit from "../SearchReddit/SearchReddit"
import { NavLink } from 'react-router-dom'

function NavBar() {
  return (
    <div>
      <img src={logo} alt='logo'/>
      <h1>
        Reddit Client
      </h1>
      <NavLink
        to="r/:subreddit"
        className={({ isActive }) =>
          isActive ? "active" : ""
        }
      >
        r/reddit
      </NavLink>
      <NavLink
        to="r/:subreddit"
        className={({ isActive }) =>
          isActive ? "active" : ""
        }
      >
        r/help
      </NavLink>
      <NavLink
        to="r/:subreddit"
        className={({ isActive }) =>
          isActive ? "active" : ""
        }
      >
        r/redditdev
      </NavLink>
      <NavLink
        to="r/:subreddit"
        className={({ isActive }) =>
          isActive ? "active" : ""
        }
      >
        r/bugs
      </NavLink>
      <SearchReddit />
    </div>
  )
}

export default NavBar