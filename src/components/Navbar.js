
function Navbar() {

    return (
      <div className="container-fluid px-0 sticky-top">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="container-fluid">
                  <a className="navbar-brand" href="/react-php-crud-app/#/">Garage Database</a>
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                          <li className="nav-item">
                              <a className="nav-link active" id="home_link" aria-current="page" href="/react-php-crud-app/#/">Home</a>
                          </li>
                          <li className="nav-item">
                              <a className="nav-link " id="list_link" href="/react-php-crud-app/#/list">Details</a>
                          </li>
                          
                      </ul>
                  
                  </div>
              </div>
          </nav>
      </div>
    );
  }
  
  export default Navbar;
  