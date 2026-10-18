import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LuEye, LuEyeOff, LuLock } from "react-icons/lu";
import { HiOutlineMail } from "react-icons/hi";

const SignIn = () => {
  const theme = useSelector(state => state.theme.value);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(<span>&nbsp;</span>);

  const togglePassword = () => {
    if(showPassword) {
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
            <li><Link>Sign-In</Link></li>
          </ul>
        </div>
      </div>

      {/* Sign-in form - section */}
      <form className={"max-w-md m-auto mt-10"}>
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
              type="text"
              className={theme === "light" ? "border-1 border-black w-full ps-10 py-2 rounded-md" : "border-1 border-light w-full ps-10 py-2 rounded-md"}
              placeholder="name@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
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
          Sign-in
        </button>

        <p className={"px-1 py-2"}>Do not have an account? <Link to={"/sign-up"} className={"link link-info"}>Sign-up</Link> now.</p>
      </form>
    </div>
  );
};

export default SignIn;