import { faCarSide } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav className="shadow-lg w-full sticky top-0 left-0 z-50 bg-white">
      <div className="flex justify-between items-center container py-3 ">
        <div className="flex justify-between items-center gap-5 cursor-pointer group">
          <FontAwesomeIcon
            icon={faCarSide}
            className="p-3 transition-colors duration-500 group-hover:bg-[var(--secondary-color)] bg-[var(--primary-color)] rounded-xl text-white"
          />
          <NavLink to="/" className="font-bold capitalize text-xl">
            autoMarket
          </NavLink>
        </div>
        <div>
          <ul className="flex justify-between items-center gap-13">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `capitalize font-medium text-sm px-3 py-2 ${
                    isActive
                      ? "bg-[var(--primary-color)]/10 rounded text-[var(--primary-color)]"
                      : ""
                  }`
                }
              >
                home
              </NavLink>
            </li>
            <li className="capitalize font-medium text-sm">
              <NavLink
                to="/browse-cars"
                className={({ isActive }) =>
                  `capitalize font-medium text-sm px-3 py-2 ${
                    isActive
                      ? "bg-[var(--primary-color)]/10 rounded text-[var(--primary-color)]"
                      : ""
                  }`
                }
              >
                browse cars
              </NavLink>
            </li>
          </ul>
        </div>
        <div>
          <ul className="flex justify-between items-center gap-13">
            <li className="capitalize font-medium text-sm">
              <NavLink
                to="/sell-car"
                className={({ isActive }) =>
                  `capitalize font-medium text-sm px-3 py-2 ${
                    isActive
                      ? "bg-[var(--primary-color)]/10 rounded text-[var(--primary-color)]"
                      : ""
                  }`
                }
              >
                sell car
              </NavLink>
            </li>
            <li className="capitalize font-medium text-sm">
              <NavLink
                to="/sign-up"
                className={({ isActive }) =>
                  `capitalize font-medium text-sm px-3 py-2 ${
                    isActive
                      ? "bg-[var(--primary-color)]/10 rounded text-[var(--primary-color)]"
                      : ""
                  }`
                }
              >
                sign up
              </NavLink>
            </li>
            <li className="capitalize font-medium text-sm">
              <NavLink
                to="/sign-in"
                className={({ isActive }) =>
                  `capitalize font-medium text-sm px-3 py-2 ${
                    isActive
                      ? "bg-[var(--primary-color)]/10 rounded text-[var(--primary-color)]"
                      : ""
                  }`
                }
              >
                sign in
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
