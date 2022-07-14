import Cookies from 'js-cookie'

import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {FaSuitcase} from 'react-icons/fa'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

function Header(props) {
  const handleLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="HeaderContainer">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="HeaderContainerBrandImage"
        />
      </Link>
      <ul className="headerLinksContainer">
        <li>
          <Link to="/" className="headerRouteLinks">
            Home
          </Link>
        </li>
        <li>
          <Link to="/jobs" className="headerRouteLinks">
            Jobs
          </Link>
        </li>
      </ul>
      <li>
        <button
          type="button"
          className="headerLogoutButton"
          onClick={handleLogout}
        >
          Logout
        </button>
      </li>
      <div className="HeaderIconsContainer">
        <Link to="/">
          <AiFillHome className="headerIcons" />
        </Link>
        <Link to="/jobs">
          <FaSuitcase className="headerIcons" />
        </Link>
        <button type="button" onClick={handleLogout}>
          <FiLogOut className="headerIcons logoutIcon" />
        </button>
      </div>
    </div>
  )
}

export default withRouter(Header)
