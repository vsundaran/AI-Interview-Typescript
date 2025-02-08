// import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthContext from "./context/AuthContext";
import { Container } from "@mui/material";
import HomeLayout from "./layouts/default";
import { lazy } from "react";

// Lazy Loading for components
const Home = lazy(() => import("./components/views/home"));
const Interview = lazy(() => import("./components/views/interview"));
// import Home from "./components/views/home";

//Loading for fallback
// import { Loading } from "./components/elementes/suspense-loading";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <AuthContext>
      <Container>
        <Routes>
          {/* <Suspense fallback={<Loading />}> */}
          <Route path="/" element={<HomeLayout />}>
            <Route index element={<Home />} />
            <Route path="/interview" element={<Interview />} />
          </Route>
          {/* </Suspense> */}
        </Routes>
      </Container>
    </AuthContext>
  );
}

export default App;
