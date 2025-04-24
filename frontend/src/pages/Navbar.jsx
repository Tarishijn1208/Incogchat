import { Link } from "react-router-dom";
import "../styles/Navbar.css"; // Adjust if needed

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          Incogchat
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/confess">Confess</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
          <Link to="/home">Home</Link>
          </li>
        </ul>
      <Link to="/profile">Profile</Link>
      </div>
    </nav>
  );
};

export default Navbar;
