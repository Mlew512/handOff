import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { api } from "../utilities";
import Button from "react-bootstrap/esm/Button";
import patient from '../assets/patient.svg';
import addPatient from '../assets/addPatient.svg';
import profileIcon from "../assets/profileIcon.svg";

const NavBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(`Searching for: ${searchValue}`);
    navigate(`search/${searchValue}/`);
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

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Hand Off
          </Link>

          {isLoggedIn && (
            <>
              <Link className="nav-item nav-link m-2" to="/patients/">
                <img
                  src={patient}
                  alt="Patients"
                  style={{ width: '50px', height: '50px' }}
                />
              </Link>
              <Link className="nav-item nav-link m-2" to={`/patients/add/`}>
                <img
                  src={addPatient}
                  alt="Patients"
                  style={{ width: '50px', height: '50px' }}
                />
              </Link>
            </>
          )}

          {isLoggedIn && (
            <form className="form-inline my-2 my-lg-0" onSubmit={handleSearch}>
              <div className="input-group">
                <input
                  className="form-control"
                  type="search"
                  placeholder="Patient Search"
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
          )}
          {isLoggedIn && (
          <Link className="nav-item nav-link m-2" to={`/profile/`}>
                <img
                  src={profileIcon}
                  alt="Profile"
                  style={{ width: '50px', height: '50px' }}
                />
              </Link>
          )}

          <div className="ml-auto">
            {!isLoggedIn ? (
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
            ) : (
              <Button variant="link" className="nav" onClick={logOut}>
                Log out
              </Button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
