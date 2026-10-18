import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LuEye, LuEyeOff, LuLock, LuUser } from "react-icons/lu";
import { HiOutlineMail } from "react-icons/hi";

const SignUp = () => {
  const theme = useSelector(state => state.theme.value);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(<span>&nbsp;</span>);

  const togglePassword = () => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
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
      <form className={"max-w-md m-auto mt-10"}>
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
        </div>

        {/* Show error - section */}
        <p className={"px-1 my-1 text-red-500"}>{showError}</p>

        {/* Submit button - section */}
        <button
          type={"submit"}
          className={"btn btn-primary w-full"}
        >
          Sign-up
        </button>

        <p className={"px-1 py-2"}>Already have an account? <Link to={"/sign-in"} className={"link link-info"}>Sign-in</Link> now.</p>
      </form>
    </div>
  );
};

export default SignUp;