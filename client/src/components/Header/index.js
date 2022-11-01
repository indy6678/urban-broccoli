import React from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

const Header = () => {

  const logout = (event) => {
    event.preventDefault();
    // remove token from localStorage
    Auth.logout();
  };

  return (
    <header className="mb-4 py-2 flex-row align-center">
      <div className="container flex-row justify-center align-center">
        <Link to="/">
          <h1 className="col-6">Find My Pet</h1>
        </Link>

        <nav className="col-4 text-center">
          {Auth.loggedIn() ? (
            <>
              <Link to={`/profile${Auth.getProfile().data.username}`}>My profile</Link>
              <a href="/" onClick={logout}>Log out</a>
            </>
          ) : (
            <>
              <Link to="/signin">Sign In</Link>
              <Link to="/adduser">Sign Up Here</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;