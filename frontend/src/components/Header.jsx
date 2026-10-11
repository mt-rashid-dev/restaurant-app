import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import { BsSun } from "react-icons/bs";
import { BsMoon } from "react-icons/bs";

import { toggleTheme } from "../utils.js";
import { setTheme } from "../features/theme/themeSlice.js";

const Header = () => {
  const theme = useSelector(state => state.theme.value);
  const dispatch = useDispatch();

  const changeTheme = () => {
    const dataTheme = toggleTheme();
    document.documentElement.setAttribute("data-theme", dataTheme);
    dispatch(setTheme(dataTheme));
  }

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg aria-label="Menu" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li><Link to={"/"}>Home</Link></li>
            <li><Link to={"/"}>Order Now</Link></li>
            <li><Link to={"/"}>Book Table</Link></li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">Restaurant</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link to={"/"}>Home</Link></li>
          <li><Link to={"/"}>Order Now</Link></li>
          <li><Link to={"/"}>Book Table</Link></li>
        </ul>
      </div>
      <div className="navbar-end">
        <button className={"btn btn-sm btn-ghost relative "}>
          <BsCart4/>
          <span className={"absolute top-0 right-0 bg-orange-300 px-1 rounded-full text-black text-xs"}>0</span>
        </button>
        <button
          className={"btn btn-sm btn-ghost"}
          onClick={changeTheme}
        >
          {theme === "light"? <BsMoon/> : <BsSun/>}
        </button>
        <a className="btn btn-sm">Sign-In</a>
      </div>
    </div>
  );
};

export default Header;