import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { api } from "../utilities";

const NavBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    // Check if the token exists in local storage
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Set isLoggedIn to true if the token exists, otherwise false
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(`Searching for: ${searchValue}`);
  };

  const logOut = async () => {
    try {
      // Retrieve the authentication token from localStorage
      const authToken = localStorage.getItem("token");
  
      if (authToken) {
        // Set the Authorization header
        api.defaults.headers.common["Authorization"] = `Token ${authToken}`;
  
        // Send the logout request
        let response = await api.post("v1/users/logout/");
  
        if (response.status === 204) {
          // Clear the token and remove Authorization header
          localStorage.removeItem("token");
          delete api.defaults.headers.common["Authorization"];
          setIsLoggedIn(false);
          navigate("/login");
        }
      } else {
        console.error("Authentication token not found");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/home">
            Hand Off
          </Link>
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
            <form
              className="form-inline my-2 my-lg-0 ml-auto"
              onSubmit={handleSearch}
            >
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
                  <button className="btn btn-outline-success" type="submit">
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="ml-auto">
            {isLoggedIn ? (
              <>
                <Link to="/home">Home</Link>
                <button onClick={logOut}>Log out</button>
              </>
            ) : (
              <>
                <Link to="/">Register</Link>
                <Link to="/login">Log In</Link>
              </>
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
