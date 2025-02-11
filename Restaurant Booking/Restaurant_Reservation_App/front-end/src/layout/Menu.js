import { useState } from "react";
import { Link } from "react-router-dom";

/**
 * Defines the menu for this application.
 *
 * @returns {JSX.Element}
 */

function Menu() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const handleToggle = () => {
    setNavbarOpen((prev) => !prev);
  };
  return (
    <nav className="sticky-top shadow-lg navbar navbar-dark mb-2 px-2 blur-behind">
      <Link to="/" className="navbar-brand">
        <span className="brand">periodic tables</span>
      </Link>
      <button
        className="navbar-toggler ml-auto"
        type="button"
        onClick={handleToggle}
      >
        <span className="navbar-toggler-icon my-toggler"></span>
      </button>
      <div className={`navbar-collapse ${navbarOpen ? "expand" : "collapse"}`}>
        <ul className="navbar-nav mx-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard" onClick={handleToggle}>
              <span className="oi oi-spreadsheet" />
              &nbsp;Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/search" onClick={handleToggle}>
              <span className="oi oi-magnifying-glass" />
              &nbsp;Search
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/reservations/new"
              onClick={handleToggle}
            >
              <span className="oi oi-calendar" />
              &nbsp;New Reservation
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/tables/new" onClick={handleToggle}>
              <span className="oi oi-vertical-align-top" />
              &nbsp;New Table
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Menu;