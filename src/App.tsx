// import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthContext from "./context/AuthContext";
import { Container } from "@mui/material";
// import { lazy } from "react";

// import InitialHome from "./HOME_UI/home";
import HomeLayout from "./layouts/default";
import Home from "./HOME_UI/home";

// Lazy Loading for components
// import HomeLayout from "./layouts/default";
// const Home = lazy(() => import("./components/views/home"));
// const Interview = lazy(() => import("./components/views/interview"));
// import Home from "./components/views/home";

//Loading for fallback
// import { Loading } from "./components/elementes/suspense-loading";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <AuthContext>
      <Container>
        <Routes>
          <Route path="/" element={<HomeLayout />}>
            <Route index element={<Home />} />
          </Route>
          {/* <Route path="/" element={<InitialHome />} /> */}
        </Routes>
      </Container>
    </AuthContext>
  );
}

export default App;
