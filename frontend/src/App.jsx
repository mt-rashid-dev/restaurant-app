import "./App.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import SignIn from "./pages/SignIn.jsx";
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
        <Routes>
          <Route path={"/"} element={<Layout>
            <Home/>
          </Layout>}/>
          <Route path={"/sign-in"} element={<Layout>
            <SignIn/>
          </Layout>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
