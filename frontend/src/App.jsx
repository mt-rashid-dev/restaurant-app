import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";

const App = () => {
  return (
    <div className={"App"}>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Layout>
            <Home/>
          </Layout>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
