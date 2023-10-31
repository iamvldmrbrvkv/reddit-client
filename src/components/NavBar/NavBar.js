import logo from '../../reddit-logo.png'
import Search from '../Search/Search'
import { NavLink } from 'react-router-dom'
import styles from './NavBar.module.css'

function NavBar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.header}>
        <img src={logo} alt='logo'/>
        <h1>
          Reddit Client
        </h1>
      </div>
      <div className={styles.navlinks}>
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
      </div>
      <Search />
    </div>
  )
}

export default NavBar