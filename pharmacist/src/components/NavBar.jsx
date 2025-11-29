import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowMenu(false);
    navigate("/login");
  };

  return (
    <div style={styles.navbar}>
      {/* Logo */}
      <div style={styles.logo} onClick={() => navigate("/")}>
        <img
          src="ayushilogo.png"
          alt="Ayushi Logo"
          style={{ width: "45px", marginRight: "10px" }}
        />
        <h1 style={{ fontSize: "22px", color: "#007bff" }}>Ayushi</h1>
      </div>

      {/* Navigation Links */}
      <ul style={styles.navLinks}>
        <li>
          <NavLink to="/" style={styles.link}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/prescriptions" style={styles.link}>
            Prescriptions
          </NavLink>
        </li>
        <li>
          <NavLink to="/orders" style={styles.link}>
            Orders
          </NavLink>
        </li>
        <li>
          <NavLink to="/order-status" style={styles.link}>
            Order Status
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile" style={styles.link}>
            Profile
          </NavLink>
        </li>
      </ul>

      {/* Right Section - Profile or Login */}
      <div style={styles.rightSection}>
        {isLoggedIn ? (
          <div
            style={styles.profileContainer}
            onMouseEnter={() => setShowMenu(true)}
            onMouseLeave={() => setShowMenu(false)}
          >
            <img
              src="profile_pic.png"
              alt="Profile"
              style={styles.profilePic}
            />
            <img
              src="dropdown_icon.svg"
              alt="Dropdown"
              style={{ width: "12px" }}
            />

            {showMenu && (
              <div style={styles.dropdownMenu}>
                <p
                  style={styles.dropdownItem}
                  onClick={() => navigate("/profile")}
                >
                  My Profile
                </p>
                <p
                  style={styles.dropdownItem}
                  onClick={() => navigate("/prescriptions")}
                >
                  Prescriptions
                </p>
                <p
                  style={styles.dropdownItem}
                  onClick={() => navigate("/orders")}
                >
                  Orders
                </p>
                <p style={styles.dropdownItem} onClick={handleLogout}>
                  Logout
                </p>
              </div>
            )}
          </div>
        ) : (
          <button
            style={styles.loginBtn}
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

// Inline CSS styles
const styles = {
  navbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 30px",
    borderBottom: "1px solid #ccc",
    backgroundColor: "#f9f9f9",
    position: "relative",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  navLinks: {
    listStyle: "none",
    display: "flex",
    gap: "25px",
    margin: 0,
    padding: 0,
  },
  link: {
    textDecoration: "none",
    color: "#333",
    fontWeight: "500",
  },
  rightSection: {
    position: "relative",
  },
  profileContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
    position: "relative",
  },
  profilePic: {
    width: "35px",
    height: "35px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  dropdownMenu: {
    position: "absolute",
    top: "45px",
    right: "0",
    backgroundColor: "#fff",
    boxShadow: "0px 2px 6px rgba(0,0,0,0.2)",
    borderRadius: "8px",
    padding: "10px 0",
    zIndex: 10,
    minWidth: "150px",
  },
  dropdownItem: {
    padding: "8px 16px",
    fontSize: "15px",
    color: "#333",
    cursor: "pointer",
  },
  loginBtn: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default NavBar;
