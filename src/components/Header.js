import { useEffect } from "react";
import { Link } from "react-router-dom";

const Header = (props) => {
  console.log(props);
const handleSignupClick = (e)=>{
  e.preventDefault();
  props.setShowSignup(true)
}
const handleCreateClick = (e)=>{
  e.preventDefault();
  props.setShowForm(true)
}
  return (
    <header>
      <div className="header-wrapper">
        <ul className="header-list">
          <li className="header-item">
            <a className="header-link brand-name" href="#"><img src={process.env.PUBLIC_URL+`/images/logo.jpeg`} alt=""/></a>
          </li>
          {props.isLoggedIn && (
            <>
              <li className="header-item">
              <a className="header-button" href="#" onClick={handleCreateClick}>Create</a>
              </li>
              <li className="header-item">
              </li>
            </>
          )}
        </ul>
        <ul className="header-list-auth">
          {!props.isLoggedIn && (
            <>
              <li className="header-auth-item">
              <a className="header-button" href="#" onClick={handleSignupClick}>SignUp</a>
              </li>
            </>
          )}
          {props.isLoggedIn && (
            <>
            <li className="header-auth-item"><span>Hello, {props.user.name}</span></li>
              <li className="header-auth-item">
              <Link className="header-button" to="" onClick={props.handleLogout}>Logout</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
