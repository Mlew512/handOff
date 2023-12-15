import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { api } from "../utilities";
import Button from "react-bootstrap/esm/Button";

const NavBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [isLoggedIn]);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(`Searching for: ${searchValue}`);
  };

  const logOut = async () => {
    try {
      const authToken = localStorage.getItem("token");

      if (authToken) {
        api.defaults.headers.common["Authorization"] = `Token ${authToken}`;

        let response = await api.post("v1/users/logout/");

        if (response.status === 204) {
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
          {isLoggedIn &&
          <Link className="navbar-nav" to="/patients/">
            Patients
          </Link>}
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
                <Button variant="link" className="nav" onClick={logOut}>
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="link"
                  className="nav"
                  onClick={() => navigate("/register")}
                >
                  Register
                </Button>
                <Button
                  variant="link"
                  className="nav"
                  onClick={() => navigate("/login")}
                >
                  Log In
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
