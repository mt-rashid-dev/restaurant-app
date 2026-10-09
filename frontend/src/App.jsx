import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout.jsx";

const App = () => {
  return (
    <div className={"App"}>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Layout>
            <p>This is home page</p>
          </Layout>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
