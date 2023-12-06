import { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(`Searching for: ${searchValue}`);
  };

  const handleLogout = () => {
    // Perform logout logic, update state, clear tokens, etc.
    setIsLoggedIn(false);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Hand Off</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <form className="form-inline my-2 my-lg-0 ml-auto" onSubmit={handleSearch}>
              <div className="input-group">
                <input
                  className="form-control"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-success"
                    type="submit"
                  >
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="ml-auto">
            {isLoggedIn ? (
              <button className="btn btn-outline-danger" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <Link className="btn btn-outline-primary" to="/login">
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Add these lines to include Bootstrap JavaScript and Popper.js */}
      <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"></script>
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    </>
  );
};

export default NavBar;
