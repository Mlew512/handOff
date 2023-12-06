// import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';



const NavBar = () => {
  const [searchValue, setSearchValue] = useState("");

  // This function could be used for handling the search functionality
  const handleSearch = (e) => {
    e.preventDefault();
    // Perform search logic or navigation with react-router-dom here
    // Example using console.log for demonstration:
    console.log(`Searching for: ${searchValue}`);
  }


  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand">Hand Off</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <form className="form-inline my-2 my-lg-0 ml-auto" onSubmit={handleSearch}>
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}


export default NavBar
