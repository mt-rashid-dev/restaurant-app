import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsCart4, BsSun, BsMoon, BsXLg } from "react-icons/bs";

import { toggleTheme } from "../utils.js";
import { setTheme } from "../features/theme/themeSlice.js";
import MiniCart from "./MiniCart.jsx";

const Header = () => {
  const theme = useSelector(state => state.theme.value);
  const length = useSelector(state => state.cart.length);
  const total = useSelector(state => state.cart.total);
  const dispatch = useDispatch();

  const changeTheme = () => {
    const dataTheme = toggleTheme();
    document.documentElement.setAttribute("data-theme", dataTheme);
    dispatch(setTheme(dataTheme));
  };

  return (
    <div className="drawer drawer-end">
      {/* 1. Hidden checkbox controlling the drawer state */}
      <input id="cart-drawer" type="checkbox" className="drawer-toggle" />

      {/* 2. Drawer Content (Contains Navbar) */}
      <div className="drawer-content flex flex-col">
        <div className="navbar bg-base-100 shadow-sm px-6">
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg aria-label="Menu" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
              </div>
              <ul tabIndex={-1} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <li><Link to={"/"}>Home</Link></li>
                <li><Link to={"/"}>Order Now</Link></li>
                <li><Link to={"/"}>Book Table</Link></li>
                <li>
                  <button
                    className="btn btn-soft btn-primary btn-sm sm:hidden mx-2 text-lg"
                    onClick={changeTheme}
                  >
                    {theme === "light"? <BsMoon/> : <BsSun/>}
                  </button>
                </li>
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

          <div className="navbar-end gap-2">
            {/* Cart Button acts as a label to toggle the drawer */}
            <label htmlFor="cart-drawer" className="btn btn-ghost relative cursor-pointer">
              <BsCart4 className="text-lg" />
              <span className="absolute top-0 right-0 bg-orange-300 px-1 rounded-full text-black text-xs">{length}</span>
            </label>

            <button
              className="btn btn-ghost hidden sm:inline"
              onClick={changeTheme}
            >
              {theme === "light"? <BsMoon/> : <BsSun/>}
            </button>

            <Link to={"/sign-in"} className="btn">Sign-In</Link>
          </div>
        </div>
      </div>

      {/* 3. Drawer Side Panel (Mini-Cart) */}
      <div className="drawer-side z-50">
        <label htmlFor="cart-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="menu bg-base-200 text-base-content min-h-full w-80 p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-base-300">
              <h2 className="text-lg font-bold">Your Cart</h2>
              <label htmlFor="cart-drawer" className="cursor-pointer"><BsXLg/></label>
            </div>
            <MiniCart/>
          </div>
          <div>
            <div className={"flex justify-between mb-2"}>
              <h3 className={"text-lg"}>Total</h3>
              <h3 className={"text-lg"}>${total.toFixed(2)}</h3>
            </div>
            <button className="btn btn-primary w-full">Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;