import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import { initTheme } from "./utils.js";
import { setTheme } from "./features/theme/themeSlice.js";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const dataTheme = initTheme();
    document.documentElement.setAttribute("data-theme", dataTheme);
    dispatch(setTheme(dataTheme));
  }, []);

  return (
    <div className={"App"}>
      <BrowserRouter>
        <ScrollToTop/>
        <Routes>
          <Route path={"/"} element={<Layout>
            <Home/>
          </Layout>}/>
          <Route path={"/sign-in"} element={<Layout>
            <SignIn/>
          </Layout>}/>
          <Route path={"/sign-up"} element={<Layout>
            <SignUp/>
          </Layout>}/>
        </Routes>
      </BrowserRouter>

      <ToastContainer/>
    </div>
  );
};

export default App;
