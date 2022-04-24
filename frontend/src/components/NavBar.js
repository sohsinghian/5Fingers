import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../images/logo.jpeg";

const NavBar = () => {
  return (
    <>
      <header className="flex flex-row justify-between bg-goldenbrown">
        <div className="ml-32 mt-3">
          <NavLink to="/">
            <img src={logo} alt="logo" width="50" height="50" />
          </NavLink>
        </div>
        <nav className="h-fit basis-full flex flex-row justify-between my-6">
          <ul className="flex flex-row ml-28">
            <li className="mr-20 hover:font-bold hover:underline underline-offset-4">
              <NavLink
                to="/menu"
                className={(navData) =>
                  navData.isActive
                    ? "font-bold underline underline-offset-4"
                    : ""
                }
              >
                Menu
              </NavLink>
            </li>
            <li className="mr-20 hover:font-bold hover:underline underline-offset-4">
              <NavLink
                to="contact-us"
                className={(navData) =>
                  navData.isActive
                    ? "font-bold underline underline-offset-4"
                    : ""
                }
              >
                Contact Us
              </NavLink>
            </li>
          </ul>
          <ul className="flex flex-row mr-32">
            <li className="ml-20 hover:font-bold hover:underline underline-offset-4">
              <NavLink
                to="cart"
                className={(navData) =>
                  navData.isActive
                    ? "font-bold underline underline-offset-4"
                    : ""
                }
              >
                Cart
              </NavLink>
            </li>
            <li className="ml-20 hover:font-bold hover:underline underline-offset-4">
              <NavLink
                to="register"
                className={(navData) =>
                  navData.isActive
                    ? "font-bold underline underline-offset-4"
                    : ""
                }
              >
                Sign Up
              </NavLink>
            </li>
            <li className="ml-20 hover:font-bold hover:underline underline-offset-4">
              <NavLink
                to="login"
                className={(navData) =>
                  navData.isActive
                    ? "font-bold underline underline-offset-4"
                    : ""
                }
              >
                Login
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default NavBar;
