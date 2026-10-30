import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { LuEye, LuEyeOff, LuLock } from "react-icons/lu";
import { HiOutlineMail } from "react-icons/hi";

import { sleep } from "../utils.js";
import { setUser } from "../features/auth/authSlice.js";

const SignIn = () => {
  const theme = useSelector(state => state.theme.value);
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const navigate = useNavigate();

  const togglePassword = () => {
    if(showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSigningIn(true);
    const signInData = { email, password };

    axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/sign-in`, signInData, { withCredentials: true })
      .then(async res => {
        toast.success(res.data.message, { autoClose: 3000, theme: theme });
        setIsSigningIn(await sleep(3500, false));
        dispatch(setUser(res.data.user));
        navigate("/");
      })
      .catch(async err => {
        toast.error(err?.response?.data?.message, { autoClose: 3000, theme: theme });
        setIsSigningIn(await sleep(3500, false));
      })
  };

  if (user) {
    return <Navigate to={"/"}/>;
  }

  return (
    <div className={"min-h-[calc(100vh-200px)]"}>
      {/* Breadcrumbs - section */}
      <div className={"flex items-center h-20 bg-base-200"}>
        <div className="breadcrumbs text-sm px-8">
          <ul>
            <li><Link to={"/"}>Home</Link></li>
            <li><Link>Sign-In</Link></li>
          </ul>
        </div>
      </div>

      {/* Sign-in form - section */}
      <form className={"max-w-md m-auto mt-10 px-8"} onSubmit={handleSubmit}>
        <h1 className={"text-center text-3xl text-primary"}>Welcome Back</h1>
        <p className={"text-center text-base-content/60"}>Sign-in to your account</p>

        {/* Email input - section */}
        <div className={"mt-3"}>
          <label className={"ps-1 text-lg"}>Email</label>
          <div className="relative">
            <div className="absolute flex items-center h-full px-3 z-1">
              <HiOutlineMail className={"size-5"}/>
            </div>
            <input
              type="email"
              className={theme === "light" ? "border-1 border-black w-full ps-10 py-2 rounded-md" : "border-1 border-light w-full ps-10 py-2 rounded-md"}
              placeholder="name@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Password input - section */}
        <div className={"mt-3"}>
          <label className={"ps-1 text-lg"}>Password</label>
          <div className="relative">
            <div className="absolute flex items-center h-full px-3 z-1">
              <LuLock className={"size-5"}/>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              className={theme === "light" ? "border-1 border-black w-full px-10 py-2 rounded-md" : "border-1 border-light w-full px-10 py-2 rounded-md"}
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <div
              className="absolute top-0 right-0 flex items-center h-full px-3 cursor-pointer z-1"
              onClick={togglePassword}
            >
              {showPassword ? <LuEyeOff className="size-5"/> : <LuEye className="size-5"/>}
            </div>
          </div>
        </div>

        {/* Submit button - section */}
        <button
          type={"submit"}
          className={"btn btn-primary w-full mt-8"}
          disabled={isSigningIn}
        >
          {isSigningIn? <span className="loading loading-spinner loading-sm"></span> : "Sign-in"}
        </button>

        <p className={"px-1 py-2"}>Do not have an account? <Link to={"/sign-up"} className={"link link-info"}>Sign-up</Link> now.</p>
      </form>
    </div>
  );
};

export default SignIn;