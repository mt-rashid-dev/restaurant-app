import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { LuEye, LuEyeOff, LuLock, LuUser } from "react-icons/lu";
import { HiOutlineMail } from "react-icons/hi";

import { sleep } from "../utils.js";
import { setUser } from "../features/auth/authSlice.js";

const SignUp = () => {
  const theme = useSelector(state => state.theme.value);
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [createPasswordError, setCreatePasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showError, setShowError] = useState(<span>&nbsp;</span>);
  const [isSigningUp, setIsSigningUp] = useState(false);

  const notifySuccess = (message) => toast.success(message, { autoClose: 3000, theme: theme });
  const notifyError = (message) => toast.error(message, { autoClose: 3000, theme: theme });

  const togglePassword = () => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    resetErrorMessages();
    setIsSigningUp(true);

    if (createPassword.length < 6) {
      setCreatePasswordError("Password must be at least 6 characters");
    }
    if (createPassword !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }

    const newUser = {
      firstName,
      lastName,
      email,
      password: createPassword
    }

    axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/sign-up`, newUser)
      .then(async res => {
        console.log(res.data);
        notifySuccess(res.data.message);
        setIsSigningUp(await sleep(3500, false));
        dispatch(setUser(res.data.user));
      })
      .catch(async err => {
        console.log(err);
        setIsSigningUp(await sleep(3500, false));
      });
  };

  const resetErrorMessages = () => {
    setCreatePasswordError("");
    setConfirmPasswordError("");
    setShowError(<span>&nbsp;</span>);
  };

  return (
    <div className={"min-h-[calc(100vh-200px)]"}>
      {/* Breadcrumbs - section */}
      <div className={"flex items-center h-20 bg-base-200"}>
        <div className="breadcrumbs text-sm px-8">
          <ul>
            <li><Link to={"/"}>Home</Link></li>
            <li><Link>Sign-Up</Link></li>
          </ul>
        </div>
      </div>

      {/* Sign-in form - section */}
      <form className={"max-w-md m-auto mt-10 px-8"} onSubmit={handleSubmit}>
        <h1 className={"text-center text-3xl text-primary"}>Welcome!</h1>
        <p className={"text-center text-base-content/60"}>Create an account to get started.</p>

        {/* First name input - section */}
        <div className={"mt-3"}>
          <label className={"ps-1 text-lg"}>First Name</label>
          <div className="relative">
            <div className="absolute flex items-center h-full px-3 z-1">
              <LuUser className={"size-5"}/>
            </div>
            <input
              type="text"
              className={theme === "light" ? "border-1 border-black w-full ps-10 py-2 rounded-md" : "border-1 border-light w-full ps-10 py-2 rounded-md"}
              placeholder="First name"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Last name input - section */}
        <div className={"mt-3"}>
          <label className={"ps-1 text-lg"}>Last Name</label>
          <div className="relative">
            <div className="absolute flex items-center h-full px-3 z-1">
              <LuUser className={"size-5"}/>
            </div>
            <input
              type="text"
              className={theme === "light" ? "border-1 border-black w-full ps-10 py-2 rounded-md" : "border-1 border-light w-full ps-10 py-2 rounded-md"}
              placeholder="Last name"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Email input - section */}
        <div className={"mt-3"}>
          <label className={"ps-1 text-lg"}>Email</label>
          <div className="relative">
            <div className="absolute flex items-center h-full px-3 z-1">
              <HiOutlineMail className={"size-5"}/>
            </div>
            <input
              type="text"
              className={theme === "light" ? "border-1 border-black w-full ps-10 py-2 rounded-md" : "border-1 border-light w-full ps-10 py-2 rounded-md"}
              placeholder="name@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Create password input - section */}
        <div className={"mt-3"}>
          <label className={"ps-1 text-lg"}>Create Password</label>
          <div className="relative">
            <div className="absolute flex items-center h-full px-3 z-1">
              <LuLock className={"size-5"}/>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              className={theme === "light" ? "border-1 border-black w-full px-10 py-2 rounded-md" : "border-1 border-light w-full px-10 py-2 rounded-md"}
              placeholder="••••••••"
              value={createPassword}
              onChange={e => setCreatePassword(e.target.value)}
              required
            />
            <div
              className="absolute top-0 right-0 flex items-center h-full px-3 cursor-pointer z-1"
              onClick={togglePassword}
            >
              {showPassword ? <LuEyeOff className="size-5"/> : <LuEye className="size-5"/>}
            </div>
          </div>
          {createPasswordError && <p className="pl-1 text-red-400">{createPasswordError}</p>}
        </div>

        {/* Confirm password input - section */}
        <div className={"mt-3"}>
          <label className={"ps-1 text-lg"}>Confirm Password</label>
          <div className="relative">
            <div className="absolute flex items-center h-full px-3 z-1">
              <LuLock className={"size-5"}/>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              className={theme === "light" ? "border-1 border-black w-full px-10 py-2 rounded-md" : "border-1 border-light w-full px-10 py-2 rounded-md"}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
            />
            <div
              className="absolute top-0 right-0 flex items-center h-full px-3 cursor-pointer z-1"
              onClick={togglePassword}
            >
              {showPassword ? <LuEyeOff className="size-5"/> : <LuEye className="size-5"/>}
            </div>
          </div>
          {confirmPasswordError && <p className="pl-1 text-red-400">{confirmPasswordError}</p>}
        </div>

        {/* Show error - section */}
        <p className={"px-1 my-1 text-red-400"}>{showError}</p>

        {/* Submit button - section */}
        <button
          type={"submit"}
          className={"btn btn-primary w-full"}
        >
          {isSigningUp? <span className="loading loading-spinner loading-sm"></span> : "Sign-up"}
        </button>

        <p className={"px-1 py-2"}>Already have an account? <Link to={"/sign-in"} className={"link link-info"}>Sign-in</Link> now.</p>
      </form>

      <ToastContainer />
    </div>
  );
};

export default SignUp;