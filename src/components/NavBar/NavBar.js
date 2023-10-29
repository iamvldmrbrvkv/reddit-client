import logo from '../../reddit-logo.png'
import Search from '../Search/Search'
import { NavLink } from 'react-router-dom'
import styles from './NavBar.module.css'

function NavBar() {
  return (
    <div>
      <img src={logo} alt='logo' className={styles.img}/>
      <h1>
        Reddit Client
      </h1>
      <NavLink
        to={`r/reddit/`}
        className={({ isActive }) =>
          isActive ? `${styles.active}` : ""
        }
      >
        r/reddit
      </NavLink>
      <NavLink
        to={`r/help/`}
        className={({ isActive }) =>
          isActive ? `${styles.active}` : ""
        }
      >
        r/help
      </NavLink>
      <NavLink
        to={`r/redditdev/`}
        className={({ isActive }) =>
          isActive ? `${styles.active}` : ""
        }
      >
        r/redditdev
      </NavLink>
      <NavLink
        to={`r/bugs/`}
        className={({ isActive }) =>
          isActive ? `${styles.active}` : ""
        }
      >
        r/bugs
      </NavLink>
      <Search />
    </div>
  )
}

export default NavBar