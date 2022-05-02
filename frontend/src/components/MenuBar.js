import React from "react";
import { NavLink } from "react-router-dom";

const MenuBar = () => {
  return (
    <>
      <div className="basis-1/6 ml-10 mt-5 border-x border-y bg-lightred text-center h-screen">
        <aside className="h-full">
          <h1 className="font-bold mt-5 text-xl">Menu</h1>
          <ul>
            <li className="mt-10 mb-5 hover:font-bold hover:text-maroon">
              <NavLink
                to="/menu/chicken"
                className={(navData) =>
                  navData.isActive ? "font-bold text-maroon" : ""
                }
              >
                😋 Chicken 😋
              </NavLink>
            </li>
            <li className="mb-5 hover:font-bold hover:text-maroon">
              <NavLink
                to="/menu/fries"
                className={(navData) =>
                  navData.isActive ? "font-bold text-maroon" : ""
                }
              >
                😋 Fries 😋
              </NavLink>
            </li>
            <li className="hover:font-bold hover:text-maroon">
              <NavLink
                to="/menu/drinks"
                className={(navData) =>
                  navData.isActive ? "font-bold text-maroon" : ""
                }
              >
                😋 Beverages 😋
              </NavLink>
            </li>
          </ul>
        </aside>
      </div>
    </>
  );
};

export default MenuBar;
