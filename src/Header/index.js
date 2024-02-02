import {Link, withRouter} from 'react-router-dom'
import {FaSuitcase, FaHome} from 'react-icons/fa'
import {IoLogOutOutline} from 'react-icons/io5'
import Cookies from 'js-cookie'
import './index.css'

const Header = ({history}) => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <ul className="header-container">
      <li>
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
      </li>
      <li className="route-container">
        <Link to="/">
          <p>Home</p>
        </Link>
        <Link to="/jobs">
          <p>Jobs</p>
        </Link>
      </li>
      <li>
        <button className="logout-button" onClick={onClickLogout}>
          Logout
        </button>
      </li>
      <li className="route-icons">
        <Link to="/">
          <FaHome size={30} />
        </Link>
        <Link to="/jobs">
          <FaSuitcase size={30} />
        </Link>
        <IoLogOutOutline onClick={onClickLogout} size={30} />
      </li>
    </ul>
  )
}

export default withRouter(Header)
