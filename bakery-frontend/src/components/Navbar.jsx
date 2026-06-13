import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

const Navbar = ({ cartCount, user, setUser, theme, setTheme }) => {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const isLoggedIn = !!user;

  const isAdmin = user?.isAdmin;

  const toggleTheme = () => {
  setTheme(
    theme === "light"
      ? "dark"
      : "light"
  );
  };

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  setUser(null);

  closeMenu();

  navigate("/login");
};

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <div className="logo-wrapper">
          <h2
            className="logo"
            onClick={() => {
              navigate("/");
              closeMenu();
            }}
          >
            Bakery<span>Shop</span>
          </h2>
        </div>

        {/* Mobile Toggle */}
        <button
          className={`menu-toggle ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Nav Links */}
        <nav className={`nav-links ${menuOpen ? "show-menu" : ""}`}>

          <NavLink
            to="/"
            className={({isActive}) => isActive ? "nav-link active" : "nav-link"}
            onClick={closeMenu}
          >
            Home
          </NavLink>

          <NavLink
            to="/cart"
            className={({isActive}) => isActive ? "nav-link active" : "nav-link"}
            onClick={closeMenu}
          >
            Cart
            <span className="cart-badge">{cartCount}</span>
          </NavLink>

          <NavLink
            to="/orders"
            className={({isActive}) => isActive ? "nav-link active" : "nav-link"}
            onClick={closeMenu}
          >
            Orders
          </NavLink>

          <button
            className="theme-toggle"
            onClick={()=>{
              toggleTheme();
              closeMenu();
            }}
            aria-label="Toggle Theme"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          {isAdmin && (
            <NavLink
              to="/admin"
              className={({isActive}) => isActive ? "nav-link active" : "nav-link"}
              onClick={closeMenu}
            >
              Admin
            </NavLink>
          )}

          {isLoggedIn ? (
            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({isActive}) => isActive ? "nav-link active" : "nav-link"}
                onClick={closeMenu}
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className={({isActive}) => isActive ? "register-btn active" : "register-btn"}
                onClick={closeMenu}
              >
                Register
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;