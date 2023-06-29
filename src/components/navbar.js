import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

import { BsFillPentagonFill } from "react-icons/bs";
import { BsPersonFill } from "react-icons/bs";
import { BsPerson } from "react-icons/bs";

import { BsPersonSquare } from "react-icons/bs";
import { FaBars, FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <nav className="navbar">
          <div className="navbar-container container">
            <Link to="../homepage/game-stats" className="navbar-logo" onClick={closeMobileMenu}>
              <BsFillPentagonFill className="navbar-icon" />
              Projet Stats
            </Link>
            <div className="menu-icon" onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
{/* -------------------------------------------------------------------------------- */}
              <li className="nav-item">
                <NavLink
                  to="../homepage/game-stats"
                  className={({ isActive }) =>
                    "nav-links" + (isActive ? " activated" : "")
                  }
                  onClick={closeMobileMenu}
                >
                  Game Stats
                </NavLink>
              </li>
{/* -------------------------------------------------------------------------------- */}
              <li className="nav-item">
                <NavLink
                  to="../homepage/tournement-creator"
                  className={({ isActive }) =>
                    "nav-links" + (isActive ? " activated" : "")
                  }
                  onClick={closeMobileMenu}
                >
                  Tournement Creator
                </NavLink>
              </li>
{/* -------------------------------------------------------------------------------- */}
              <li className="nav-item">
                <NavLink
                  to="../homepage/account"
                  className={({ isActive }) =>
                    "nav-links" + (isActive ? " activated" : "")
                  }
                  onClick={closeMobileMenu}
                >
                  <BsPersonFill className="navbar-icon" />
                </NavLink>
              </li>

            </ul>
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
