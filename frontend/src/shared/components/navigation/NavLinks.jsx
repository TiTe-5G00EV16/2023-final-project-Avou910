import { NavLink } from 'react-router-dom';
import { useContext } from 'react';

import { AuthContext } from '../../context/auth-context';

import './NavLinks.css';

const NavLinks = props => {
  const auth = useContext(AuthContext);

  return <ul className="nav-links">
    
    <li>
        <NavLink to="/" exact>ALL ARTICLES</NavLink>
    </li>
    {auth.isLoggedIn && (
      <li>
        <NavLink to="/articles/new">ADD NEW ARTICLE FOR SALE</NavLink>
      </li>
    )}
     {auth.isLoggedIn && (
      <li>
        <NavLink to="/articles/user">MY ARTICLES</NavLink>
      </li>
    )}
    {auth.isLoggedIn && (
      <li>
        <NavLink to="/users" exact>USER PROFILE</NavLink>
      </li>
    )}
    {!auth.isLoggedIn && (
      <li>
        <NavLink to="/auth">LOG IN</NavLink>
      </li>
    )}
    {auth.isLoggedIn && (
      <li>
        <button onClick={auth.logout}>LOG OUT</button>
      </li>
    )}
  </ul>
};

export default NavLinks;
